--moving posting date +1 if it's not EOC date to make posting transactions hit new charges setup
update sys_posting_date spd
  set spd.posting_date = (select max(cce.current_cycle_end) current_cycle_end
                           from CBR_BILLING_CYCLE cce
						  where cce.institution_number = 'var_institution_number')
where spd.institution_number = 'var_institution_number'
  and spd.station_number = '129';
commit;

