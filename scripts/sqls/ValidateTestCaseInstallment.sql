select trn.card_number, trn.client_number, trn.transaction_class, trn.transaction_category, trn.retrieval_reference, addd.ticket_number as t_num, addd.ADDENDUM_NUMBER, trn.tran_amount_gr,
inst.Loan_amount, inst.installment_amount, inst.first_installment_amount, addd.carrier_name
from INT_ADDENDUM_AIRLINE addd,
     int_transactions trn,
     int_addendum_installment inst
where trn.INSTITUTION_NUMBER = 'var_institution_number'
and trn.TRANSACTION_SLIP = inst.TRANSACTION_SLIP
and inst.TRANSACTION_SLIP = addd.TRANSACTION_SLIP
and trn.file_number  in ('var_file_number');