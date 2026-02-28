using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateTime? OrderDate { get; set; }

    public decimal OrderTotalPrice { get; set; }

    public int OrderUserId { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User OrderUser { get; set; } = null!;
}
