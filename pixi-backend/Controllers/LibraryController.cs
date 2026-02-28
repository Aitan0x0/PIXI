using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly PixiContext _sql;

        public LibraryController(PixiContext sql)
        {
            _sql = sql;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetLibrary(int userId)
        {
            //var userId = int.Parse(User.FindFirst("id")?.Value);
            if (userId == 0)
                return NotFound();

            var libraryGames = await _sql.Libraries.Where(x => x.LibraryUserId == userId).Include(x => x.LibraryGame).ThenInclude(x => x.GameImages).Select(x => new
            {
                x.LibraryGame.GameId,
                x.LibraryGame.GameName,
                x.LibraryGame.GameCategory,
                x.LibraryGame.GameNewPrice,
                MainImage = x.LibraryGame.GameImages
                                 .FirstOrDefault(img => img.IsMain == "true").ImageUrl

            }).ToListAsync();
            return Ok(libraryGames);


        }
    }
}
