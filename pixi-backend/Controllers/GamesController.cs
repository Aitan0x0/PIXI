using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;
using System.Globalization;
using System.IO;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly PixiContext _sql;

        public GamesController(PixiContext sql)
        {
            _sql = sql;
        }

        private string GetUploadPath()
        {
            return Path.Combine("wwwroot", "img", "games");
        }

        // GET ALL GAMES
        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames()
        {
            var games = await _sql.Games
                .Include(g => g.GameImages)
                .Include(g => g.GameCategory)
                .ToListAsync();

            return Ok(games);
        }

     
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _sql.Games
                .Include(g => g.GameImages)
                .Include(g => g.GameCategory)
                .SingleOrDefaultAsync(g => g.GameId == id);

            if (game == null) return NotFound("Game not found");
            return Ok(game);
        }

       
        [HttpPost("add")]
        public async Task<ActionResult<Game>> AddGame(
               [FromForm] string gameName,
            [FromForm] string gameDeveloper,
            [FromForm] string gameDescription,
            [FromForm] string gameRating,
            [FromForm] int gameCategoryId,
            [FromForm] string gameNewPrice,
            [FromForm] IFormFileCollection newImages,

            [FromForm] int mainImageIndex = 0)
        {
            var uploadPath = GetUploadPath();
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);
            var game = new Game { 
                    GameName = gameName,
                GameDeveloper = gameDeveloper,
                GameDescription = gameDescription,
                GameCategoryId = gameCategoryId,
                GameNewPrice = decimal.Parse(gameNewPrice, CultureInfo.InvariantCulture),
                GameRating = double.Parse(gameRating, CultureInfo.InvariantCulture),
                GameOldPrice = 0,


                };
            game.GameOldPrice = 0;

            _sql.Games.Add(game);
            await _sql.SaveChangesAsync();

            for (int i = 0; i < newImages.Count; i++)
            {
                var file = newImages[i];
                var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                _sql.GameImages.Add(new GameImage
                {
                    ImageGameId = game.GameId,
                    ImageUrl = $"/img/games/{fileName}",
                    IsMain = (i == mainImageIndex ? "true" : "false")
                });
            }

            await _sql.SaveChangesAsync();
     

            return Ok(game);
        }

        // UPDATE GAME
        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> UpdateGame(
            int id,
            [FromForm] string gameName,
            [FromForm] string gameDeveloper,

            [FromForm] string gameDescription,
            [FromForm] int gameCategoryId,
            [FromForm] string gameNewPrice,
[FromForm] string gameRating,


            [FromForm] IFormFileCollection? newImages,
            [FromForm] int? mainImageIndex)
        {
            var game = await _sql.Games
                .Include(g => g.GameImages)
                .SingleOrDefaultAsync(g => g.GameId == id);
        

            if (game == null) return NotFound("Game not found");

            game.GameName = gameName;
            game.GameOldPrice = game.GameNewPrice;
            game.GameNewPrice = decimal.Parse(gameNewPrice, CultureInfo.InvariantCulture);
            game.GameRating = double.Parse(gameRating, CultureInfo.InvariantCulture);
            game.GameDescription = gameDescription;
            game.GameDeveloper = gameDeveloper;
            game.GameCategoryId = gameCategoryId;


            var uploadPath = GetUploadPath();
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);


            if (mainImageIndex.HasValue)
            {
                foreach (var img in game.GameImages)
                    img.IsMain = "false";
            }

            if (newImages != null)
            {
                for (int i = 0; i < newImages.Count; i++)
                {
                    var file = newImages[i];
                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadPath, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);

                    _sql.GameImages.Add(new GameImage
                    {
                        ImageGameId = game.GameId,
                        ImageUrl = $"/img/games/{fileName}",
                        IsMain = (mainImageIndex.HasValue && i == mainImageIndex.Value ? "true" : "false")
                    });
                }
            }

            await _sql.SaveChangesAsync();
         


            return Ok(game);
        }

        // DELETE GAME
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGame(int id)
        {
            var game = await _sql.Games
                .Include(g => g.GameImages)
                .SingleOrDefaultAsync(g => g.GameId == id);

            if (game == null) return NotFound("Game not found");

            foreach (var img in game.GameImages)
            {
                var filePath = Path.Combine("wwwroot", "img", "games", Path.GetFileName(img.ImageUrl));
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            _sql.GameImages.RemoveRange(game.GameImages);
            _sql.Games.Remove(game);
            await _sql.SaveChangesAsync();

            return NoContent();
        }

        // DELETE SINGLE IMAGE
        [HttpDelete("image/{imageId}")]
        public async Task<ActionResult> DeleteImage(int imageId)
        {
            var img = await _sql.GameImages.FindAsync(imageId);
            if (img == null) return NotFound("Image not found");

            var filePath = Path.Combine("wwwroot", "img", "games", Path.GetFileName(img.ImageUrl));
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);

            _sql.GameImages.Remove(img);
            await _sql.SaveChangesAsync();

            return NoContent();
        }
    }
}
