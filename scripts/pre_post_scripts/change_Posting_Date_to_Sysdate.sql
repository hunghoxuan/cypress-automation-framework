---- Update Posting date------
update sys_posting_date
set posting_date =(SELECT TO_CHAR(SYSDATE, 'YYYYMMDD') FROM dual)
where  INSTITUTION_NUMBER = 'var_institution_number' and Station_number = '129';
commit;
