using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class RefreshToken
{
    public int TokenId { get; set; }

    public int TokenUserId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime Expires { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User TokenUser { get; set; } = null!;
}
