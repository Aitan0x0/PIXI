using System;
using System.Collections.Generic;

namespace PIXI_API.Models;

public partial class Library
{
    public int LibraryId { get; set; }

    public int? LibraryUserId { get; set; }

    public int? LibraryGameId { get; set; }

    public virtual Game? LibraryGame { get; set; }

    public virtual User? LibraryUser { get; set; }
}
