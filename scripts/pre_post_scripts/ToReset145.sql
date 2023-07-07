


DELETE FROM INT_FILE_LOG_DETAILS WHERE     PROCESS_NAME = '000145' AND institution_number ='00000111' AND RECORD_DATE>='20230328' ;
DELETE FROM HST_STATEMENT_ACCOUNT WHERE INSTITUTION_NUMBER ='00000111' AND RECORD_DATE>='20230328' ;
DELETE FROM HST_STATEMENT_LOG WHERE    institution_number = '00000111' AND RECORD_DATE>='20230328' ;
DELETE FROM HST_STATEMENT_ADDRESS WHERE INSTITUTION_NUMBER = '00000111' AND RECORD_DATE>='20230328' ;
Delete  FROM HST_STATEMENT_ACCT_BALANCE WHERE     INSTITUTION_NUMBER = '00000111' and acct_number like '%0000015%' ;
UPDATE CAS_CLIENT_ACCOUNT SET     last_statement_date = '' ,    LAST_STATEMENT_NUMBER = '',LAST_SETTLEMENT_DATE='' WHERE institution_number = '00000111'  AND last_statement_date = '20230328'   ;
Update  CAS_CYCLE_BOOK_BALANCE  SET BEGIN_BALANCE='0',CURRENT_BALANCE='0', DR_BALANCE_RETAIL='0', DR_BALANCE_CHARGES='0',CR_BALANCE_PAYMENTS='0', LAST_BALANCE_UPDATE=NULL  WHERE INSTITUTION_NUMBER = '00000111' and acct_number like '%0000015%' and PROCESSING_STATUS = '004';

Commit;





  /*

  select *  FROM HST_STATEMENT_ACCT_BALANCE WHERE     INSTITUTION_NUMBER = '00000111' and acct_number like '%317%' ;
 Select last_statement_date ,    LAST_STATEMENT_NUMBER ,LAST_SETTLEMENT_DATE FROM CAS_CLIENT_ACCOUNT  WHERE institution_number = '00000111'  AND last_statement_date ='20221130' ;
 --SET     last_statement_date = '' ,    LAST_STATEMENT_NUMBER = '',LAST_SETTLEMENT_DATE=''
Select BEGIN_BALANCE,CURRENT_BALANCE, DR_BALANCE_RETAIL, DR_BALANCE_CHARGES,CR_BALANCE_PAYMENTS, LAST_BALANCE_UPDATE FROM  CAS_CYCLE_BOOK_BALANCE   WHERE INSTITUTION_NUMBER = '00000111' and acct_number like '%235%' and PROCESSING_STATUS = '004';





Select *  FROM INT_FILE_LOG_DETAILS WHERE     PROCESS_NAME = '000145' AND institution_number ='00000111' AND RECORD_DATE='20221125' ;
Select *  FROM HST_STATEMENT_ACCOUNT WHERE INSTITUTION_NUMBER ='00000111' and date_statement_end = '20221125' ;
--Select statement_number FROM HST_STATEMENT_ACCOUNT WHERE INSTITUTION_NUMBER ='00000111' and date_statement_end = '20221125' ;
Select *  FROM HST_STATEMENT_LOG WHERE    institution_number = '00000111' and date_statement_end = '20221125';
Select *  FROM HST_STATEMENT_ADDRESS WHERE INSTITUTION_NUMBER = '00000111' and record_date= '20221125' ;
Select * FROM HST_STATEMENT_ACCT_BALANCE WHERE     INSTITUTION_NUMBER = '00000111' and statement_number in (Select statement_number FROM HST_STATEMENT_ACCOUNT WHERE INSTITUTION_NUMBER ='00000111' and date_statement_end = '20221125');
Select last_statement_date ,    LAST_STATEMENT_NUMBER ,LAST_SETTLEMENT_DATE FROM CAS_CLIENT_ACCOUNT  WHERE institution_number = '00000111'  AND last_statement_date <> '00000000' ;
 --SET     last_statement_date = '' ,    LAST_STATEMENT_NUMBER = '',LAST_SETTLEMENT_DATE=''
Select BEGIN_BALANCE,CURRENT_BALANCE, DR_BALANCE_RETAIL, DR_BALANCE_CHARGES,CR_BALANCE_PAYMENTS, LAST_BALANCE_UPDATE FROM  CAS_CYCLE_BOOK_BALANCE   WHERE INSTITUTION_NUMBER = '00000111' and acct_number like '%235%' and PROCESSING_STATUS = '004';
 -- SET BEGIN_BALANCE='0',CURRENT_BALANCE='0', DR_BALANCE_RETAIL='0', DR_BALANCE_CHARGES='0',CR_BALANCE_PAYMENTS='0', LAST_BALANCE_UPDATE=NULL



DELETE FROM INT_FILE_LOG_DETAILS WHERE     PROCESS_NAME = '000145' AND institution_number ='00000111' AND RECORD_DATE>='20221128' ;
DELETE FROM HST_STATEMENT_ACCOUNT WHERE INSTITUTION_NUMBER ='00000111' ;
DELETE FROM HST_STATEMENT_LOG WHERE    institution_number = '00000111' ;
DELETE FROM HST_STATEMENT_ADDRESS WHERE INSTITUTION_NUMBER = '00000111';
DELETE FROM HST_STATEMENT_ACCT_BALANCE WHERE     INSTITUTION_NUMBER = '00000111';
UPDATE CAS_CLIENT_ACCOUNT SET     last_statement_date = '' ,    LAST_STATEMENT_NUMBER = '',LAST_SETTLEMENT_DATE='' WHERE institution_number = '00000111'  AND last_statement_date = '20221130' ;
Update  CAS_CYCLE_BOOK_BALANCE  SET BEGIN_BALANCE='0',CURRENT_BALANCE='0', DR_BALANCE_RETAIL='0', DR_BALANCE_CHARGES='0',CR_BALANCE_PAYMENTS='0', LAST_BALANCE_UPDATE=NULL  WHERE INSTITUTION_NUMBER = '00000111' and acct_number like '%235%' and PROCESSING_STATUS = '004';

*/

--OR:

--Pre process 000145, Clearing Data for Pipeline 
REM BAK NONE
--
DECLARE
    v_posting_date                 VARCHAR2(8);
    v_institution_number         VARCHAR2(8) := '00000115';
    v_station_number             VARCHAR2(3) := '129';
BEGIN
    --
    SELECT POSTING_DATE
    INTO v_posting_date
    FROM SYS_POSTING_DATE
    WHERE INSTITUTION_NUMBER = v_institution_number
    AND STATION_NUMBER = v_station_number;  
    --        
    delete from HST_STATEMENT_CARD 
    where institution_number = v_institution_number;
    --
    delete from HST_STATEMENT_LOG 
    where institution_number = v_institution_number
    AND DATE_STATEMENT_END = v_posting_date ;
    --
    delete from HST_STATEMENT_ACCOUNT 
    where institution_number = v_institution_number
    ;
    --
    delete from HST_STATEMENT_ACCT_BALANCE 
    where institution_number = v_institution_number
    ;
    --
    delete from HST_STATEMENT_ADDRESS 
    where institution_number = v_institution_number
    ;
    --
    delete from HST_STATEMENT_CHARGES 
    where institution_number = v_institution_number;
    --
    delete from HST_STATEMENT_CONTROL_TS 
    where institution_number = v_institution_number;
    --
    delete from HST_STATEMENT_HISTORY 
    where institution_number = v_institution_number;
    --
    delete from HST_STATEMENT_MESSAGES 
    where institution_number = v_institution_number;
    --
    delete from HST_STATEMENT_TRANSACTIONS 
    where institution_number = v_institution_number;
    --
    delete  from INT_FILE_LOG_DETAILS
    where institution_number = v_institution_number
    and process_name = '000145'
    AND RECORD_DATE = v_posting_date ;
    --
    COMMIT;
    --
END;
/