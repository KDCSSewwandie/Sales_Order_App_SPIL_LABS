// Infrastructure/Repositories/ClientRepository.cs
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _db;
        public ClientRepository(AppDbContext db) => _db = db;

        public async Task<IEnumerable<Client>> GetAllAsync() =>
            await _db.Clients.AsNoTracking().ToListAsync();

        public async Task<Client> GetByIdAsync(int id) =>
            await _db.Clients.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
    }
}
