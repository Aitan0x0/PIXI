using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? CategoryImgUrl { get; set; }

    public virtual ICollection<Game> Games { get; set; } = new List<Game>();
}
