using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public decimal? OrderPrice { get; set; }

    public int OrderItemOrderId { get; set; }

    public int OrderItemGameId { get; set; }

    public virtual Game OrderItemGame { get; set; } = null!;

    public virtual Order OrderItemOrder { get; set; } = null!;
}
