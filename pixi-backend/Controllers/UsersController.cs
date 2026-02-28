using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using PIXI_API.Models;
using PIXI_API.Services;
using System.Text;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly PixiContext _sql;
        private readonly TokenServices _tokenServices;

        public UsersController(PixiContext sql, TokenServices tokenServices)

        {
            _sql = sql;
            _tokenServices = tokenServices;

        }

        [HttpGet]
        public async Task<IActionResult> UsersGet()
        {
            var users = await _sql.Users.ToListAsync();
            return Ok(users);


        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
        [FromForm] string userName,
        [FromForm] string email,
        [FromForm] string password,
        [FromForm] string confirmPassword,
        [FromForm] IFormFile? userImg)
        {
            if (password != confirmPassword)
                return BadRequest("Passwords do not match!");

            if (await _sql.Users.AnyAsync(x => x.Email == email))
                return BadRequest("Bu istifadeci qeydiyyatdan kecib");
       

            var existingUser = await _sql.Users
                .SingleOrDefaultAsync(u => u.Username.ToLower() == userName.Trim().ToLower());

            if (existingUser != null)
                return BadRequest("Bu username artıq movcuddur");


       
            string imgName;

            if (userImg != null)
            {
                imgName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(userImg.FileName);
                string imgPath = Path.Combine("wwwroot", "img", "users", imgName);
                using var stream = new FileStream(imgPath, FileMode.Create);
                await userImg.CopyToAsync(stream);
            }
            else
            {
                imgName = "default_profile.jpg";
            }

            var user = new User
            {
                Username = userName,
                Email = email,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Role = "user",
                UserImageUrl = "/img/users/" + imgName,
            };

            await _sql.Users.AddAsync(user);
            await _sql.SaveChangesAsync();

            var token = _tokenServices.GenerateToken(user);

            return Ok(new
            {
                user.UserId,
                user.Username,
                user.Email,
                user.UserImageUrl,
                token
            });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var user = await _sql.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                return Unauthorized("Email yoxdur");
            }
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                return Unauthorized("Sifre dogru deyil");

            var token = _tokenServices.GenerateToken(user);
            var refreshToken = _tokenServices.GenerateRefreshToken();

            var yeniToken = new RefreshToken
            {
                TokenUserId = user.UserId,
                Token = refreshToken,
                Expires = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
            };
            _sql.RefreshTokens.Add(yeniToken);
            await _sql.SaveChangesAsync();

            return Ok(new
            {
                user.UserId,
                user.Username,
                user.Email,
                user.UserImageUrl,
                user.Role , 
                token = token,
                rToken = yeniToken

            }
            );
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromForm] string refreshToken)
        {
            var storedToken = await _sql.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == refreshToken);

            if (storedToken == null || storedToken.Expires < DateTime.UtcNow)
                return Unauthorized("Refresh token etibarsizdir");

            var user = await _sql.Users.FindAsync(storedToken.TokenUserId);
            if (user == null)
                return Unauthorized();

            // Yeni Access Token yaradılır
            var newAccessToken = _tokenServices.GenerateToken(user);

            return Ok(new
            {
                token = newAccessToken
            });
        }

        //[Authorize(Roles = "admin")]
        //[HttpGet]
        //public async Task<IActionResult> GetUsers()
        //{
        //    var users = await _sql.Users.Select(x => new
        //    {
        //        x.UserId,
        //        x.Username,
        //        x.Email,
        //        x.UserImageUrl,
        //        x.Role,
        //    }).ToListAsync();
        //    return Ok(users);

        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _sql.Users.Where(x => x.UserId == id).Select(x => new
            {
                x.UserId,
                x.Username,
                x.Email,
                x.UserImageUrl,
                x.Role
            })
     .FirstOrDefaultAsync();

            if (user == null)
                return NotFound("Bele user yoxdur");

            return Ok(user);
        }

        //[Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {


            var delUser = await _sql.Users.SingleOrDefaultAsync(x => x.UserId == id);
            var adminCount = await _sql.Users.CountAsync(x => x.Role == "admin");
            if (delUser.Role == "admin" && adminCount == 1)
            {
                return BadRequest("Son admini silmek olmaz");
            }

            if (delUser == null) return NotFound("Bele user yoxdur");
            var tokens = _sql.RefreshTokens.Where(t => t.TokenUserId == id);
            _sql.RefreshTokens.RemoveRange(tokens);
            await _sql.SaveChangesAsync();

            _sql.Users.Remove(delUser);
            await _sql.SaveChangesAsync();
            return Ok("User ugurla silindi!");
        }



        [HttpPut("{id}")]
      

        public async Task<IActionResult> EditUser(int id, [FromForm] string username, [FromForm] string email, [FromForm] string role, [FromForm] IFormFile? userImg)
        {
            var user = await _sql.Users.SingleOrDefaultAsync(x => x.UserId == id);
            if (user == null) return NotFound("Bele user yoxdur");

            user.Username = username ?? user.Username;
            user.Email = email ?? user.Email;
            user.Role = role ?? user.Role;

            if (userImg != null)
            {
                var imgName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(userImg.FileName);
                var imgPath = Path.Combine("wwwroot", "img", "users", imgName);

                using var stream = new FileStream(imgPath, FileMode.Create);
                await userImg.CopyToAsync(stream);
                user.UserImageUrl = "/img/users/" + imgName;

            }
            await _sql.SaveChangesAsync();

            return Ok("ugurla deyisdi");





        }

        [HttpPut("settings")]
        [Authorize]
        public async Task<IActionResult> SetProfile(
      [FromForm] string username,
      [FromForm] string email,
      [FromForm] string? oldPassword,
      [FromForm] string? newPassword,
      [FromForm] string? yoxlaPassword,
      [FromForm] IFormFile? userImg)
        {
      
            var userId = int.Parse(User.FindFirst("id")?.Value);
            var user = await _sql.Users.SingleOrDefaultAsync(x => x.UserId == userId);

            if (user == null)
                return NotFound("Belə istifadəçi yoxdur");

         
            user.Username = username ?? user.Username;
            user.Email = email ?? user.Email;

            if (!string.IsNullOrEmpty(newPassword))
            {
                if (string.IsNullOrEmpty(oldPassword))
                    return BadRequest("Kohne sifreni daxil edin");

                if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
                    return BadRequest("Kohne sifre dogru deyil");

                if (newPassword != yoxlaPassword)
                    return BadRequest("Yeni sifre tekrari dogru deyil");

                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            }

            if (userImg != null)
            {
                var imgName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + Path.GetExtension(userImg.FileName);
                var imgPath = Path.Combine("wwwroot", "img", "users", imgName);

                using var stream = new FileStream(imgPath, FileMode.Create);
                await userImg.CopyToAsync(stream);

                user.UserImageUrl = "/img/users/" + imgName;
            }

            await _sql.SaveChangesAsync();

            return Ok(new
            {
                user.UserId,
                user.Username,
                user.Email,
                user.UserImageUrl
            });
        }


    }
}
