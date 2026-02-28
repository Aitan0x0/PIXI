using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PIXI_API.Models;

namespace PIXI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class OrdersController : ControllerBase
    {

        private readonly PixiContext _sql;

        public OrdersController(PixiContext sql)
        {
            _sql = sql;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _sql.Orders.Include(x => x.OrderItems).ThenInclude(x => x.OrderItemGame).Include(x => x.OrderUser).ToListAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrders( int id)
        {
            var order = await _sql.Orders

      .Include(o => o.OrderItems)
          .ThenInclude(oi => oi.OrderItemGame)
              .ThenInclude(g => g.GameImages)

      .Include(o => o.OrderItems)
          .ThenInclude(oi => oi.OrderItemGame)
              .ThenInclude(g => g.GameCategory)

      .Include(o => o.OrderUser)
      .SingleOrDefaultAsync(o => o.OrderId == id);

            if (order == null)
                return NotFound("Bele order yoxdur");

            var result = new
            {
                order.OrderId,
                OrderUser = new {
                    order.OrderUser.UserId,
                    order.OrderUser.Username,

                },
                OrderItems = order.OrderItems.Select(oi => new
                {
                    oi.OrderItemId,
                    oi.OrderPrice,
                    OrderItemGame = new
                    {
                        oi.OrderItemGame.GameId,
                        oi.OrderItemGame.GameName,

                        oi.OrderItemGame.GameDeveloper,
                        CatName = oi.OrderItemGame.GameCategory.CategoryName,

                        MainImg = oi.OrderItemGame.GameImages.FirstOrDefault(img => img.IsMain == "true").ImageUrl

                    }

                }



                    )


            };
            
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _sql.Orders.SingleOrDefaultAsync(x => x.OrderId == id);
            if (order == null) return NotFound("Bele order yoxdur");
            _sql.Orders.Remove(order);
            await _sql.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("buy")]
        public async Task<IActionResult> BuyCart()
        {
          
            var userId = int.Parse(User.FindFirst("id")?.Value);

          
            var cartItems = await _sql.Carts
                .Where(c => c.CartUserId == userId)
                .Include(c => c.CartGame)
                .ToListAsync();

            if (!cartItems.Any())
                return NotFound("Cart boşdur");

          
            var order = new Order
            {
                OrderUserId = userId,
                OrderTotalPrice = (decimal)cartItems.Sum(c => c.CartGame.GameNewPrice),
                OrderDate = DateTime.Now
            };

            await _sql.Orders.AddAsync(order);
            await _sql.SaveChangesAsync(); 

           
            foreach (var item in cartItems)
            {
             
                _sql.OrderItems.Add(new OrderItem
                {
                    OrderItemOrderId = order.OrderId,  
                    OrderItemGameId = (int)item.CartGameId,
                    OrderPrice = item.CartGame.GameNewPrice
                });

               
                var alreadyOwned = await _sql.Libraries.AnyAsync(l =>
                    l.LibraryUserId == userId && l.LibraryGameId == item.CartGameId
                );

                if (!alreadyOwned)
                {
                    _sql.Libraries.Add(new Library
                    {
                        LibraryUserId = userId,
                        LibraryGameId = item.CartGameId
                    });
                }
            }

        
            _sql.Carts.RemoveRange(cartItems);

           
            await _sql.SaveChangesAsync();

            return Ok("Oyunlar uğurla alındı");
        }




    }
}
