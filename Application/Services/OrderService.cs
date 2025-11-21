// Application/Services/OrderService.cs
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orders;
        private readonly IItemRepository _items;

        public OrderService(IOrderRepository orders, IItemRepository items)
        {
            _orders = orders;
            _items = items;
        }

        // Create order, calculate line totals and header totals
        public async Task<SalesOrder> CreateOrderAsync(SalesOrder order)
        {
            // Populate line price if not provided
            foreach (var line in order.Lines)
            {
                var item = await _items.GetByIdAsync(line.ItemId);
                if (item == null) throw new Exception("Item not found.");

                // Use item price if price not passed from client
                line.Price = line.Price == 0 ? item.Price : line.Price;

                line.ExclAmount = Math.Round(line.Quantity * line.Price, 2);
                line.TaxAmount = Math.Round(line.ExclAmount * line.TaxRate / 100m, 2);
                line.InclAmount = Math.Round(line.ExclAmount + line.TaxAmount, 2);
            }

            order.TotalExcl = order.Lines.Sum(l => l.ExclAmount);
            order.TotalTax = order.Lines.Sum(l => l.TaxAmount);
            order.TotalIncl = order.Lines.Sum(l => l.InclAmount);

            var created = await _orders.CreateAsync(order);
            return created;
        }

        public Task<SalesOrder> GetByIdAsync(int id) => _orders.GetByIdAsync(id);
        public Task<System.Collections.Generic.IEnumerable<SalesOrder>> GetAllAsync() => _orders.GetAllAsync();
    }
}
