using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Game
{
    public int GameId { get; set; }

    public string? GameDescription { get; set; }

    public string? GameDeveloper { get; set; }

    public decimal? GameOldPrice { get; set; }

    public decimal? GameNewPrice { get; set; }

    public double? GameRating { get; set; }

    public int? GameCategoryId { get; set; }

    public string GameName { get; set; } = null!;

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category? GameCategory { get; set; }

    public virtual ICollection<GameImage> GameImages { get; set; } = new List<GameImage>();

    public virtual ICollection<Library> Libraries { get; set; } = new List<Library>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
