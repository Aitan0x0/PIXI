using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Wishlist
{
    public int WishlistId { get; set; }

    public int? WishlistUserId { get; set; }

    public int? WishlistGameId { get; set; }

    public virtual Game? WishlistGame { get; set; }

    public virtual User? WishlistUser { get; set; }
}
