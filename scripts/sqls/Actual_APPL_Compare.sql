--actual
select institution_number, client_number,  record_date,application_status, contact_name, condition_set, group_number
  from cis_application_detail
 where institution_number = '00000111'
  and client_number in ('00000335','00000337','00000334','00000333');
