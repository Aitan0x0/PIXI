using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly PixiContext _sql;
        private readonly IWebHostEnvironment _env;

        public CategoriesController(PixiContext sql, IWebHostEnvironment env)
        {
            _sql = sql;
            _env = env;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            return await _sql.Categories.ToListAsync();
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _sql.Categories.FindAsync(id);
            if (category == null) return NotFound();
            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] string catName, [FromForm] IFormFile catImg)
        {
            if (string.IsNullOrWhiteSpace(catName))
                return BadRequest("Category name is required");

            if (catImg == null || catImg.Length == 0)
                return BadRequest("Image is required");

            string fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName())
                              + Path.GetExtension(catImg.FileName);

            string saveFolder = Path.Combine(_env.WebRootPath, "img", "catimg");
            if (!Directory.Exists(saveFolder))
                Directory.CreateDirectory(saveFolder);

            string fullPath = Path.Combine(saveFolder, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await catImg.CopyToAsync(stream);
            }

            var category = new Category
            {
                CategoryName = catName,
                CategoryImgUrl = "/img/catimg/" + fileName   
            };

            _sql.Categories.Add(category);
            await _sql.SaveChangesAsync();

            return Ok(category);
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> PutCategory(int id, [FromForm] string catName, [FromForm] IFormFile? catImg)
        {
            var category = await _sql.Categories.FindAsync(id);
            if (category == null) return NotFound();

            if (!string.IsNullOrWhiteSpace(catName))
                category.CategoryName = catName;

            if (catImg != null && catImg.Length > 0)
            {
                // 🔴 Köhnə şəkli sil
                if (!string.IsNullOrEmpty(category.CategoryImgUrl))
                {
                    string oldPath = Path.Combine(_env.WebRootPath, category.CategoryImgUrl);
                    if (System.IO.File.Exists(oldPath))
                        System.IO.File.Delete(oldPath);
                }

                string newFileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName())
                                     + Path.GetExtension(catImg.FileName);

                string saveFolder = Path.Combine(_env.WebRootPath, "img", "catimg");
                if (!Directory.Exists(saveFolder))
                    Directory.CreateDirectory(saveFolder);

                string newFullPath = Path.Combine(saveFolder, newFileName);

                using (var stream = new FileStream(newFullPath, FileMode.Create))
                {
                    await catImg.CopyToAsync(stream);
                }

                category.CategoryImgUrl = "/img/catimg/" + newFileName; 
            }

            await _sql.SaveChangesAsync();
            return Ok(category);
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _sql.Categories.FindAsync(id);
            if (category == null) return NotFound();

            if (!string.IsNullOrEmpty(category.CategoryImgUrl))
            {
                string imgPath = Path.Combine(_env.WebRootPath, category.CategoryImgUrl);
                if (System.IO.File.Exists(imgPath))
                    System.IO.File.Delete(imgPath);
            }

            _sql.Categories.Remove(category);
            await _sql.SaveChangesAsync();

            return NoContent();
        }
    }
}
