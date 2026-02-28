using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly PixiContext _sql;

        public WishlistController(PixiContext sql)
        {
            _sql = sql;
        }

        // İstifadəçinin wishlist-i və yalnız main image göndərmək
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserWishlist(int userId)
        {
            var wishlist = await _sql.Wishlists
                .Include(x => x.WishlistGame)
                .ThenInclude(x => x.GameImages)
                .Where(x => x.WishlistUserId == userId)
                .Select(w => new
                {
                    w.WishlistId,
                    w.WishlistUserId,
                    GameId = w.WishlistGame.GameId,
                    GameName = w.WishlistGame.GameName,
                    GamePrice = w.WishlistGame.GameNewPrice,
                    MainImage = w.WishlistGame.GameImages
                                 .FirstOrDefault(img => img.IsMain == "true").ImageUrl
                })
                .ToListAsync();

            return Ok(wishlist);
        }

        // Yeni oyun əlavə etmək
        [HttpPost]
        public async Task<IActionResult> AddWishlist(Wishlist wishlist)
        {
            var existing = await _sql.Wishlists
                .SingleOrDefaultAsync(x => x.WishlistUserId == wishlist.WishlistUserId
                                        && x.WishlistGameId == wishlist.WishlistGameId);

            if (existing != null)
                return BadRequest("Bu oyun artiq wishlistde movcuddur.");

            await _sql.Wishlists.AddAsync(wishlist);
            await _sql.SaveChangesAsync();

            // Əlavə olunan oyun ilə main image göndəririk
            var newWishlist = await _sql.Wishlists
                .Include(w => w.WishlistGame)
                    .ThenInclude(g => g.GameImages)
                .Where(w => w.WishlistId == wishlist.WishlistId)
                .Select(w => new
                {
                    w.WishlistId,
                    w.WishlistUserId,
                    GameId = w.WishlistGame.GameId,
                    GameName = w.WishlistGame.GameName,
                    GamePrice = w.WishlistGame.GameNewPrice,
                    MainImage = w.WishlistGame.GameImages
                                 .FirstOrDefault(img => img.IsMain == "true").ImageUrl
                })
                .FirstOrDefaultAsync();

            return Ok(newWishlist);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveWishlist(int id)
        {
            var game = await _sql.Wishlists.SingleOrDefaultAsync(x => x.WishlistId == id);
            if (game == null)
                return NotFound();

            _sql.Wishlists.Remove(game);
            await _sql.SaveChangesAsync();
            return NoContent();
        }
    }
}
