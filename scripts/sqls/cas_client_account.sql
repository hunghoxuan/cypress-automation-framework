
UPDATE CAS_CLIENT_ACCOUNT
SET CURRENT_CYCLE_START = (select CURRENT_CYCLE_START
from CBR_BILLING_CYCLE where institution_number = '00000006')
where institution_number = '00000006';
UPDATE CAS_CLIENT_ACCOUNT
SET CURRENT_CYCLE_END = (select CURRENT_CYCLE_END
from CBR_BILLING_CYCLE where institution_number = '00000006')
where institution_number = '00000006' ;
commit;