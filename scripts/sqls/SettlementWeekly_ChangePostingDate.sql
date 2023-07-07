ALTER session set NLS_DATE_FORMAT = 'yyyy/mm/dd'; --avoid format date error

declare
  v_posting_date     varchar2(30);

begin

select posting_date
  into v_posting_date
  from sys_posting_date
 where institution_number = 'var_institution_number'
   and station_number = 'var_station_number';

if to_char(to_date(v_posting_date, 'yyyy/mm/dd'), 'day') = 'tuesday  ' then  --if tuesday, it will be for wednesday from next week
  v_posting_date     := to_char(to_date(v_posting_date, 'yyyy/mm/dd')+8, 'yyyymmdd');
  --dbms_output.put_line ('first IF - '|| v_posting_date);
elsif to_char(to_date(v_posting_date, 'yyyy/mm/dd'), 'day') = 'wednesday' then
  v_posting_date     := to_char(to_date(v_posting_date, 'yyyy/mm/dd')+7, 'yyyymmdd'); --if wednesday, it will be for next wednesday
  --dbms_output.put_line ('second IF - '|| v_posting_date);
else
  begin
  while to_char(to_date(v_posting_date, 'yyyy/mm/dd'), 'day') <> 'wednesday'
    loop
      v_posting_date     := to_char(to_date(v_posting_date, 'yyyy/mm/dd')+1, 'yyyymmdd');-- any other day, it will be for the next wednesday
      --dbms_output.put_line ('third IF - 2 '|| v_posting_date );
    end loop;
  end;
end if;

update sys_posting_date
   set posting_date = to_char(to_date(v_posting_date, 'yyyy/mm/dd'), 'yyyymmdd')
-- where  INSTITUTION_NUMBER = '00000111' and Station_number = '129';
 where institution_number = 'var_institution_number' and station_number = 'var_station_number';
commit;

end;
/
ALTER session set NLS_DATE_FORMAT='MM/DD/YYYY HH24:MI:SS';  --reverting to the original date format


