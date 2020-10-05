using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataContext.Data
{
        public abstract class Entity
    {
        protected Entity()
        {

        }

        protected Entity(DateTime transactionDate)
        {
           TransactionDate = transactionDate;
        }

        [NotMapped]
        public DateTime TransactionDate { get; set; }
   
    }
}