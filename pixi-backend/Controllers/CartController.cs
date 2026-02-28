using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly PixiContext _sql;

        public CartController(PixiContext sql)
        {
            _sql = sql;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddCart(int id)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            if (await _sql.Carts.AnyAsync(x => x.CartUserId == userId && x.CartGameId == id))
                return BadRequest("Bu oyun cartda movcuddur");

            var cart = new Cart
            {
                CartGameId = id,
                CartUserId = userId
            };

            await _sql.Carts.AddAsync(cart);
            await _sql.SaveChangesAsync();

            return Ok("Oyun ugurla elave olundu");


        }
        //oyunun idsi gelir

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCart(int id)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);

            var delGame = await _sql.Carts.FirstOrDefaultAsync(x => x.CartUserId == userId && x.CartGameId == id);

            if (delGame == null)
                return BadRequest("Cartda oyun teyin olunmadi");
            _sql.Remove(delGame);
            await _sql.SaveChangesAsync();
            return Ok("Oyun sebetden ugurla cixarildi");
        }

        [HttpDelete("cart/clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);

            var userCart = await _sql.Carts.Where(x => x.CartUserId == userId).ToListAsync();

            if (!userCart.Any())
                return NotFound("Cart bosdur");
            _sql.Carts.RemoveRange(userCart);
            await _sql.SaveChangesAsync();
            return Ok("Cart ugurla silindi :>");


        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            var userIdClaim = User.FindFirst("id")?.Value;
            Console.WriteLine($"USER ID: {userIdClaim}");


            var gamesCart = await _sql.Carts.Where(x => x.CartUserId == userId).Include(x => x.CartGame).ThenInclude(x => x.GameImages).Include(x => x.CartGame).ThenInclude(x => x.GameCategory).Select(x => new
            {
               gameId= x.CartGame.GameId,
              gameName =   x.CartGame.GameName,
               gameNewPrice= x.CartGame.GameNewPrice,
               categoryName =  x.CartGame.GameCategory.CategoryName,
                images = x.CartGame.GameImages
            .Where(img => img.IsMain == "true")  
            .Select(img => img.ImageUrl)
            .ToList()
            }).ToListAsync();
            return Ok(gamesCart);




        }
    }

}
