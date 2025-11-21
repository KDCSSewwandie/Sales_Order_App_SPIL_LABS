// API/Controllers/ClientsController.cs
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ClientsController : ControllerBase
	{
		private readonly IClientRepository _repo;
		public ClientsController(IClientRepository repo) => _repo = repo;

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var clients = await _repo.GetAllAsync();
			return Ok(clients);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var c = await _repo.GetByIdAsync(id);
			if (c == null) return NotFound();
			return Ok(c);
		}
	}
}
