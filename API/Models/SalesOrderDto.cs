// API/Models/SalesOrderDto.cs
using System;
using System.Collections.Generic;

namespace API.Models
{
    public class SalesOrderDto
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string ReferenceNo { get; set; }
        public string Note { get; set; }
        public int ClientId { get; set; }
        public List<SalesOrderLineDto> Lines { get; set; } = new();
    }

    public class SalesOrderLineDto
    {
        public int ItemId { get; set; }
        public string Note { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }    // optional - API can send 0 and service will fill
        public decimal TaxRate { get; set; }
    }
}
