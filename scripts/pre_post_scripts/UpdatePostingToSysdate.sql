UPDATE sys_posting_date
   SET posting_date = to_char(sysdate,'yyyymmdd')
 where institution_number= 'var_institution_number' and station_number= 'var_station_number';
commit;





