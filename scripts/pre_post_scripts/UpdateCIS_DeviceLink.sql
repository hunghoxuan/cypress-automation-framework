update  CIS_DEVICE_LINK
set  SYSTEM_BATCH_ID='000000',DATE_SETTLEMENT='',TIME_SETTLEMENT=''
where institution_number  ='00000111'
and client_number in ('00000333','00000337','00000334','00000335');
commit;