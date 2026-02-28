using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PIXI_API.Models;

public partial class PixiContext : DbContext
{
    public PixiContext()
    {
    }

    public PixiContext(DbContextOptions<PixiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<GameImage> GameImages { get; set; }

    public virtual DbSet<Library> Libraries { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-Q12JPV7\\SQLEXPRESS;Database=PIXI;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Cart__2EF52A27E36C3A7C");

            entity.ToTable("Cart");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.CartGameId).HasColumnName("cart_game_id");
            entity.Property(e => e.CartUserId).HasColumnName("cart_user_id");

            entity.HasOne(d => d.CartGame).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CartGameId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Cart__cart_game___440B1D61");

            entity.HasOne(d => d.CartUser).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CartUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Cart__cart_user___4316F928");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__D54EE9B43E4699FB");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryImgUrl)
                .HasMaxLength(200)
                .HasColumnName("category_img_url");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .HasColumnName("category_name");
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.GameId).HasName("PK__Games__FFE11FCFA8306452");

            entity.Property(e => e.GameId).HasColumnName("game_id");
            entity.Property(e => e.GameCategoryId).HasColumnName("game_category_id");
            entity.Property(e => e.GameDescription)
                .HasColumnType("text")
                .HasColumnName("game_description");
            entity.Property(e => e.GameDeveloper)
                .HasMaxLength(100)
                .HasColumnName("game_developer");
            entity.Property(e => e.GameName)
                .HasMaxLength(200)
                .HasColumnName("game_name");
            entity.Property(e => e.GameNewPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("game_newPrice");
            entity.Property(e => e.GameOldPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("game_oldPrice");
            entity.Property(e => e.GameRating).HasColumnName("game_rating");

            entity.HasOne(d => d.GameCategory).WithMany(p => p.Games)
                .HasForeignKey(d => d.GameCategoryId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Games__game_cate__3D5E1FD2");
        });

        modelBuilder.Entity<GameImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__GameImag__DC9AC95512CFBBD1");

            entity.Property(e => e.ImageId).HasColumnName("image_id");
            entity.Property(e => e.ImageGameId).HasColumnName("image_game_id");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(200)
                .HasColumnName("image_url");
            entity.Property(e => e.IsMain).HasMaxLength(10);

            entity.HasOne(d => d.ImageGame).WithMany(p => p.GameImages)
                .HasForeignKey(d => d.ImageGameId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GameImage__image__403A8C7D");
        });

        modelBuilder.Entity<Library>(entity =>
        {
            entity.HasKey(e => e.LibraryId).HasName("PK__Library__7A2F73CA865C6601");

            entity.ToTable("Library");

            entity.Property(e => e.LibraryId).HasColumnName("library_id");
            entity.Property(e => e.LibraryGameId).HasColumnName("library_game_id");
            entity.Property(e => e.LibraryUserId).HasColumnName("library_user_id");

            entity.HasOne(d => d.LibraryGame).WithMany(p => p.Libraries)
                .HasForeignKey(d => d.LibraryGameId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Library__library__4BAC3F29");

            entity.HasOne(d => d.LibraryUser).WithMany(p => p.Libraries)
                .HasForeignKey(d => d.LibraryUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Library__library__4AB81AF0");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__4659622946D87B04");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderTotalPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("order_totalPrice");
            entity.Property(e => e.OrderUserId).HasColumnName("order_user_id");

            entity.HasOne(d => d.OrderUser).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrderUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Orders__order_us__619B8048");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId).HasName("PK__OrderIte__3764B6BC2543EB0D");

            entity.Property(e => e.OrderItemId).HasColumnName("order_item_id");
            entity.Property(e => e.OrderItemGameId).HasColumnName("order_item_game_id");
            entity.Property(e => e.OrderItemOrderId).HasColumnName("order_item_order_id");
            entity.Property(e => e.OrderPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("order_price");

            entity.HasOne(d => d.OrderItemGame).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderItemGameId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderItem__order__60A75C0F");

            entity.HasOne(d => d.OrderItemOrder).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderItemOrderId)
                .HasConstraintName("FK__OrderItem__order__5FB337D6");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.TokenId).HasName("PK__RefreshT__658FEEEA468763B3");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Expires).HasColumnType("datetime");
            entity.Property(e => e.Token).HasMaxLength(500);

            entity.HasOne(d => d.TokenUser).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.TokenUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RefreshTokens_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BE370F29846237");

            entity.HasIndex(e => e.Email, "UQ__Users__AB6E6164FD8C7655").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__Users__F3DBC5729B8DAF19").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(10)
                .HasColumnName("role");
            entity.Property(e => e.UserImageUrl)
                .HasMaxLength(200)
                .HasColumnName("user_image_url");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.WishlistId).HasName("PK__Wishlist__6151514E89391F57");

            entity.ToTable("Wishlist");

            entity.Property(e => e.WishlistId).HasColumnName("wishlist_id");
            entity.Property(e => e.WishlistGameId).HasColumnName("wishlist_game_id");
            entity.Property(e => e.WishlistUserId).HasColumnName("wishlist_user_id");

            entity.HasOne(d => d.WishlistGame).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.WishlistGameId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Wishlist__wishli__47DBAE45");

            entity.HasOne(d => d.WishlistUser).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.WishlistUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Wishlist__wishli__46E78A0C");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
