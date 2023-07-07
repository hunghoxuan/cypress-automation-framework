select i.institution_number, i.card_number, i.client_number, i.transaction_status, i.tran_amount_gr
  from int_transactions i
 where i.institution_number = 'var_institution_number'
   and i.file_number in ('var_file_number')
   and i.transaction_class = '002'
   and i.card_number in ('51314340001000003')
order by i.card_number, transaction_slip desc
;