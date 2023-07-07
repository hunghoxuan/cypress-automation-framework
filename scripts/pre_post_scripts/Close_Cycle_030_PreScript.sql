--CREATE TEMPORARY TABLE IF IT DOES NOT EXIST
declare
  v_sql LONG;
begin
dbms_output.put_line('START: ' || sysdate);

BEGIN
  v_sql:='CREATE TABLE CAS_CYCLE_BOOK_BALANCE_TEMP AS SELECT * FROM bw3.CAS_CYCLE_BOOK_BALANCE WHERE 1 = 0';
  execute immediate v_sql;
EXCEPTION
  WHEN others THEN
    NULL;
END;


BEGIN
  v_sql:='CREATE TABLE CAS_CLIENT_ACCOUNT_TEMP AS SELECT * FROM bw3.CAS_CLIENT_ACCOUNT WHERE 1 = 0';
  execute immediate v_sql;
EXCEPTION
  WHEN others THEN
    NULL;
END;

BEGIN
  v_sql:='CREATE TABLE CBR_CONTRACT_ACCT_TYPES_TEMP AS SELECT * FROM bw3.CBR_CONTRACT_ACCT_TYPES WHERE 1 = 0';
  execute immediate v_sql;
EXCEPTION
  WHEN others THEN
    NULL;
END;


BEGIN
  v_sql:='CREATE TABLE CBR_BILLING_CYCLE_TEMP AS SELECT * FROM bw3.CBR_BILLING_CYCLE WHERE 1 = 0';
  execute immediate v_sql;
EXCEPTION
  WHEN others THEN
    NULL;
END;


EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE = -955 THEN
      NULL; -- suppresses ORA-00955 exception
    ELSE
      RAISE;
    END IF;
END;
/

--BACKUP DATA
begin
--clean temp data
delete from CAS_CYCLE_BOOK_BALANCE_TEMP
      where institution_number = 'var_institution_number'
;
delete from CAS_CLIENT_ACCOUNT_TEMP
      where institution_number = 'var_institution_number'
;
delete from CBR_CONTRACT_ACCT_TYPES_TEMP
      where institution_number = 'var_institution_number'
;
delete from CBR_BILLING_CYCLE_TEMP
      where institution_number = 'var_institution_number'
;
dbms_output.put_line('Clean temp tables. ' || sysdate);

--insert temp data from the current month
insert into CAS_CYCLE_BOOK_BALANCE_TEMP
       (select *
          from CAS_CYCLE_BOOK_BALANCE
         where institution_number = 'var_institution_number'
           and date_cycle_start = (select max(date_cycle_start)
                                     from CAS_CYCLE_BOOK_BALANCE
                                    where institution_number = 'var_institution_number'))
;
dbms_output.put_line('CAS_CYCLE_BOOK_BALANCE_TEMP saved. ' || sysdate);

insert into CAS_CLIENT_ACCOUNT_TEMP
       (select *
          from CAS_CLIENT_ACCOUNT
         where institution_number = 'var_institution_number'
           and acct_status = '001')
;
dbms_output.put_line('CAS_CLIENT_ACCOUNT_TEMP saved. ' || sysdate);

--insert temp data from the current table
insert into CBR_CONTRACT_ACCT_TYPES_TEMP
       (select *
          from CBR_CONTRACT_ACCT_TYPES
         where institution_number = 'var_institution_number')
;
dbms_output.put_line('CBR_CONTRACT_ACCT_TYPES_TEMP saved. ' || sysdate);

insert into CBR_BILLING_CYCLE_TEMP
       (select *
          from CBR_BILLING_CYCLE
         where institution_number = 'var_institution_number')
;
dbms_output.put_line('CBR_BILLING_CYCLE_TEMP saved. ' || sysdate);
commit;
end;
/
