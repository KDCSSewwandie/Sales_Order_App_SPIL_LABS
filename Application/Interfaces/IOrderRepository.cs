// Application/Interfaces/IOrderRepository.cs
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<SalesOrder>> GetAllAsync();
        Task<SalesOrder> GetByIdAsync(int id);
        Task<SalesOrder> CreateAsync(SalesOrder order);
        Task UpdateAsync(SalesOrder order);
    }
}
