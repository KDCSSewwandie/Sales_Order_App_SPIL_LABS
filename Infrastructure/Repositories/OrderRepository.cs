// Infrastructure/Repositories/OrderRepository.cs
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _db;
        public OrderRepository(AppDbContext db) => _db = db;

        public async Task<SalesOrder> CreateAsync(SalesOrder order)
        {
            _db.SalesOrders.Add(order);
            await _db.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<SalesOrder>> GetAllAsync()
        {
            return await _db.SalesOrders
                .Include(o => o.Client)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<SalesOrder> GetByIdAsync(int id)
        {
            return await _db.SalesOrders
                .Include(o => o.Lines)
                    .ThenInclude(l => l.Item)
                .Include(o => o.Client)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task UpdateAsync(SalesOrder order)
        {
            _db.SalesOrders.Update(order);
            await _db.SaveChangesAsync();
        }
    }
}
