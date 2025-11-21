// API/Controllers/OrdersController.cs
using API.Models;
using Application.Services;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;     // for DbContext
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _service;
        public OrdersController(OrderService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _service.GetAllAsync();
            // Map minimal view model
            var list = orders.Select(o => new {
                o.Id,
                o.InvoiceNo,
                o.InvoiceDate,
                ClientName = o.Client?.Name,
                o.TotalIncl
            });
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var order = await _service.GetByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SalesOrderDto dto)
        {
            // Map DTO to domain entity (simple manual mapping here)
            var order = new SalesOrder
            {
                InvoiceNo = dto.InvoiceNo,
                InvoiceDate = dto.InvoiceDate,
                ReferenceNo = dto.ReferenceNo,
                Note = dto.Note,
                ClientId = dto.ClientId,
            };

            foreach (var l in dto.Lines)
            {
                order.Lines.Add(new SalesOrderLine
                {
                    ItemId = l.ItemId,
                    Note = l.Note,
                    Quantity = l.Quantity,
                    Price = l.Price,
                    TaxRate = l.TaxRate
                });
            }

            var created = await _service.CreateOrderAsync(order);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
    }
}
