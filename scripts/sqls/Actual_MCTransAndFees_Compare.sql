select client_number, record_date, transaction_status, transaction_category, transaction_class,
       sum(tran_amount_gr) tran_amount_gr
  from int_transactions
 where institution_number = 'var_institution_number'
   and client_number in ('00000333','00000337','00000334','00000335')
   and file_number in ('var_file_number')
   and transaction_class = '012'
   and transaction_category in ('016','007')
   group by client_number, record_date, transaction_status, transaction_category, transaction_class,
            number_slips, file_number
;
