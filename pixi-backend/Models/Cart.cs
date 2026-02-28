using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int? CartUserId { get; set; }

    public int? CartGameId { get; set; }

    public virtual Game? CartGame { get; set; }

    public virtual User? CartUser { get; set; }
}
