using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class GameImage
{
    public int ImageId { get; set; }

    public string? ImageUrl { get; set; }

    public int? ImageGameId { get; set; }

    public string? IsMain { get; set; }

    public virtual Game? ImageGame { get; set; }
}
