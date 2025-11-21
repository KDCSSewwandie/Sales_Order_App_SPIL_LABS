// Domain/Entities/Item.cs
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Item
    {
        public int Id { get; set; }
        [Required] public string Code { get; set; }
        [Required] public string Description { get; set; }
        public decimal Price { get; set; }
    }
}
