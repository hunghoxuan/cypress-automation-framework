declare
  v_inst varchar2(8) := '00000111';
  -- v_application_number varchar2(10);
  -- v_parent_appl varchar(10);
  -- v_client_number varchar2(8);
  -- v_group_number varchar2(8);
  type tabApplications is table of varchar2(10) index by varchar2(8);
  tApps tabApplications;
  type tabGroups is table of varchar2(8) index by varchar2(8);
  tGroups tabGroups;

--
------------------------------------------------------------
--
  
  procedure cleanup(p_client in varchar2)
  is
    app_number varchar2(10);
  begin
    select APPLICATION_NUMBER into app_number from CIS_APPLICATION_DETAIL where INSTITUTION_NUMBER = v_inst and CLIENT_NUMBER = p_client and rownum <= 1;
	  --
    delete from CIS_APPLICATION_DETAIL where INSTITUTION_NUMBER = v_inst and CLIENT_NUMBER = p_client;
   delete from CIS_SETTLEMENT_INFORMATION where INSTITUTION_NUMBER = v_inst and CLIENT_NUMBER = p_client;
    delete from CIS_CLIENT_LINKS where institution_number = v_inst and client_number = p_client;
    delete from CIS_ADDRESSES where institution_number = v_inst and client_number = p_client;
    delete from CIS_CLIENT_ADDENDUM where institution_number = v_inst and client_number = p_client;
    delete from CAS_CLIENT_ACCOUNT where institution_number = v_inst and client_number = p_client;
	delete from CAS_CLIENT_ACCOUNT where institution_number = v_inst and client_number = p_client;
    delete from CIS_CLIENT_DETAILS where institution_number = v_inst and client_number = p_client;
    delete from CAS_CYCLE_BOOK_BALANCE where institution_number = v_inst and acct_number like (p_client || '%');
    delete from SVC_CLIENT_SERVICE where institution_number = v_inst and client_number = p_client;
    --
    delete from CIS_APPLICATION_ADDR where INSTITUTION_NUMBER = v_inst and APPLICATION_NUMBER = app_number;
    delete from CIS_APPLICATION_ACCT_TYPE where INSTITUTION_NUMBER = v_inst and APPLICATION_NUMBER = app_number;
    delete from CIS_APPLICATION_SERVICES where INSTITUTION_NUMBER = v_inst and APPLICATION_NUMBER = app_number;
    delete from CIS_APPL_CLIENT_ADDENDUM where institution_number = v_inst and application_number = app_number;
    
  exception
    when no_data_found then
      null;
    --
    when others then
      dbms_output.put_line(' > ERROR: [' || sqlerrm || ']');
      raise;
  end;
  
 
--
------------------------------------------------------------
--
  function getAppNumber(p_client in varchar2)
  return varchar2
  is
  begin

    if not tApps.exists(p_client) then
      tApps(p_client) := BW_CODE_LIBRARY.GETNEXTSEQNUMBER('017', 1, v_inst);
    end if;

    return tApps(p_client);
  end;
--
------------------------------------------------------------
--
  function getGroupNumber(p_client in varchar2)
  return varchar2
  is
  begin

    if not tGroups.exists(p_client) then
      tGroups(p_client) := BW_CODE_LIBRARY.GETNEXTSEQNUMBER('018', 1, v_inst);
    end if;

    return tGroups(p_client);
  end;
--
------------------------------------------------------------
--
  procedure createAccounts(p_app_number in varchar2,
                           p_billing in varchar2,
                           p_acct_type in varchar2,
                           p_currency in varchar2
                           )
  is
   r_acct cis_application_acct_type%rowtype;
  begin
    --dbms_output.put_line('create accts for appl:'||p_app_number);
    for r_currency in (select distinct column_value from table(bw_util.split(p_acct_type,',')))
    loop
      for r_acctType in (select distinct column_value from table(bw_util.split(p_currency,',')))
      loop
        r_acct.INSTITUTION_NUMBER                  :=   v_inst                      ;
        r_acct.APPLICATION_NUMBER                  :=   p_app_number                ;
        r_acct.ACCOUNT_TYPE_ID                     :=   r_currency.column_value     ;
        r_acct.ACCT_CURRENCY                       :=   r_acctType.column_value     ;
        r_acct.RECORD_TYPE                         :=   '003'                       ;
        r_acct.RECORD_DATE                         :=   '20230308'                  ;
        r_acct.BILLING_LEVEL                       :=   nvl(p_billing,'001')        ;
        r_acct.BANK_CLEARING_NUMBER                :=   ''                 ;
        r_acct.SETTLEMENT_BANK_NAME                :=   ''          ;
        r_acct.SETTLEMENT_BANK_CITY                :=   ''      ;
        r_acct.BANK_CONTACT_NAME                   :=   ''         ;
        r_acct.BANK_TEL_NUMBER                     :=   ''                ;
        r_acct.COUNTER_BANK_ACCOUNT                :=   ''                 ;
        r_acct.PAYMENT_REFERENCE                   :=   ''               ;
        r_acct.AUDIT_TRAIL                         :=   '23060-101425-999999-129-77777-36865'                ;
        r_acct.CORRESP_BANK_NUMBER                 :=   ''              ;
        r_acct.CORRESP_BANK_ACCOUNT                :=   ''             ;
        r_acct.COUNTER_BANK_ACCOUNT_NAME           :=   '' ;
        r_acct.STATEMENT_GENERATION                :=   '001'                       ;
        r_acct.ACCT_NUMBER_RBS                     :=   ''                ;
        r_acct.ACCT_NUMBER                         :=   ''                  ;
        r_acct.STATEMENT_TYPE                      :=   '900'                       ;
        r_acct.RECEIVER_COUNTRY_CODE               :=   '280'                       ;
		r_acct.PAYMENT_BANK_CLIENT                 :=   ''                  ;
        insert  into CIS_APPLICATION_ACCT_TYPE values r_acct;
        --dbms_output.put_line(r_currency.column_value ||'-'|| r_acctType.column_value);
      end loop;
    end loop; -- currency

  end;

  procedure createApplDetail(p_app_number in varchar2,
							 p_parent_appl in varchar2,
							 p_group_number in varchar2,
							 p_client_number in varchar2,
							 p_entity_id in varchar2,
							 p_client_level in varchar2,
							 p_settlement_method in varchar2,
							 p_client_type in varchar2,
							 p_service_contract_id in varchar2,
							 p_business_class in varchar2,
							 p_posting_method in varchar2,
							 p_condition_set in varchar2,
							 p_tran_tariff in varchar2)
  is
  r_appl cis_application_detail%rowtype;
  begin
	r_appl.INSTITUTION_NUMBER                 :=  v_inst;
	r_appl.APPLICATION_NUMBER                 :=  p_app_number;
	r_appl.RECORD_DATE                        :=  '20230308';
	r_appl.RECORD_TYPE                        :=  '003';
	r_appl.CLIENT_NUMBER                      :=  p_client_number;
	r_appl.CLIENT_NUMBER_RBS                  :=  null;
	r_appl.APPLICATION_STATUS                 :=  '002';
	r_appl.LAST_NAME                          :=  'Alkhatib';
	r_appl.FIRST_NAME                         :=  'Younes';
	r_appl.CONTACT_NAME                       :=  'Test MP'||p_client_number;
	r_appl.VAT_REG_NUMBER                     :=  '020819940208099';
	r_appl.REGISTRATION_NUMBER                :=  '02081094';
	r_appl.CLIENT_TYPE                        :=  p_client_type;
	r_appl.RESIDENCE_STATUS                   :=  '001';
	r_appl.CLIENT_LANGUAGE                    :=  '001';
	r_appl.INSTITUTION_ACCT_OFFICER           :=  '000';
	r_appl.PROVIDER_ACCT_OFFICER              :=  '000';
	r_appl.CLIENT_BRANCH                      :=  '000';
	r_appl.SHORT_NAME                         :=  'test MP';
	r_appl.COMPANY_NAME                       :=  'test MP';
	r_appl.LEGAL_FORM                         :=  '006';
	r_appl.TRADE_NAME                         :=  'test MP';
	r_appl.BUSINESS_CLASS                     :=  p_business_class;
	r_appl.OUR_REFERENCE                      := lpad(p_client_number,15,'0');
	r_appl.SERVICE_CONTRACT_ID                :=  '110';
	r_appl.CONDITION_SET                      :=  p_condition_set;
	r_appl.LIMIT_CURRENCY                     :=  '978';
	r_appl.FLOOR_LIMIT                        :=  '0';
	r_appl.CLIENT_LEVEL                       :=  p_client_level;
	r_appl.SETTLEMENT_METHOD                  :=  p_settlement_method;
	r_appl.POSTING_METHOD                     :=  p_posting_method;
	r_appl.PARENT_APPL_NUMBER                 :=  p_parent_appl;
	r_appl.LAST_AMENDMENT_DATE                :=  '20230308';
	r_appl.AUDIT_TRAIL                        :=  '23060-101858-999999-129-99999-00002';
	r_appl.CLIENT_COUNTRY                     :=  '280';
	r_appl.CLIENT_CITY                        :=  'Frankfurt';
	r_appl.GROUP_NUMBER                       :=  p_group_number;
	r_appl.CONTRACT_CATEGORY                  :=  '003';
	r_appl.POST_CODE                          :=  '09432';
	r_appl.CLIENT_STATE                       :=  '';
	r_appl.MERCHANT_STREET                    :=  'Street_Test_Name';
	r_appl.CLIENT_REGION                      :=  '000';
	r_appl.MIDDLE_NAME                        :=  'Mohammed';
	r_appl.ECOMMERCE_INDICATOR                :=  '999';
	r_appl.SERVICE_TEL_NUMBER                 :=  '';
	r_appl.RISK_GROUP                         :=  '001';
	r_appl.LOCKING_COUNTER                    :=  1;
	r_appl.ACCUMULATOR_SCHEME                 :=  '000';
	r_appl.APPL_PROC_INVOKED                  :=  0;
	r_appl.MC_IP_QUALIFICATION                :=  '';
	r_appl.MC_IP_VALUE                        :=  null;
	r_appl.VISA_IP_QUALIFICATION              :=  '';
	r_appl.VISA_IP_VALUE                      :=  null;
	r_appl.RCC                                :=  null;
	r_appl.CROSS_BORDER_FEE_IND               :=  '';
	r_appl.DOMESTIC_MCC                       :=  '';
	r_appl.CLIENT_SCHEME                      :=  '000000';
	r_appl.COUNTRY_OF_ISSUE                   :=  '';
	r_appl.WEBSITE_ADDRESS                    :=  '';
	r_appl.TRANSFER_METHOD                    :=  '000001';
	r_appl.BIRTH_COUNTRY                      :=  '';
	r_appl.CLIENT_STATUS                      :=  '001';
	r_appl.MERCHANT_TRAN_TARIFF               :=   p_tran_tariff;
	r_appl.CONTRACT_REGION                    :=  '999';
	r_appl.VAT_REGION                         :=  null;
	r_appl.VAT_COUNTRY                        :=  '';
	r_appl.DINERS_INTES_CODE                  :=  null;
	r_appl.Entity_ID                          :=  p_entity_id;
	r_appl.service_contract_id			      := p_service_contract_id;

	insert into cis_application_detail values r_appl;

  end;

  procedure createAddress(p_app_number in varchar2,
						  p_addr_category in varchar2)
   is
   r_addr cis_application_addr%rowtype;
   begin
	for rec in (select distinct column_value from table (bw_util.split(p_addr_category,',')))
	loop

		r_addr.INSTITUTION_NUMBER     := v_inst                     ;
		r_addr.APPLICATION_NUMBER     := p_app_number               ;
		r_addr.ADDRESS_CATEGORY       := rec.column_value           ;
		r_addr.RECORD_DATE            := '20230308'                 ;
		r_addr.ADDR_LINE_1            := 'Street_Test_Name'||rec.column_value    ;
		r_addr.ADDR_LINE_2            := ''    ;
		r_addr.ADDR_LINE_3            := 'Frankfurt'   ;
		r_addr.POST_CODE              := '09432'                    ;
		r_addr.ADDR_CLIENT_CITY       := 'Frankfurt'                    ;
		r_addr.CLIENT_COUNTRY         := '280'                      ;
		r_addr.AUDIT_TRAIL            := '23060-101337-999999-129-77777-36817'               ;
		r_addr.RECORD_TYPE            := '003'                      ;
		r_addr.EMAIL_ADDR             := ''            ;
		r_addr.DELIVERY_METHOD        := '000'                      ;
		r_addr.EFFECTIVE_DATE         := '20230308'                 ;
		r_addr.GROUP_SPECIFIC         := '000'                      ;
		r_addr.CLIENT_STATE           := ''                      ;

	    insert into cis_application_addr values r_addr;

	end loop;

   end;

   procedure createClientAdd(p_app_number in varchar2)
   is
   r_add CIS_APPL_CLIENT_ADDENDUM%rowtype;
   begin

	r_add.RECORD_DATE                    :=      '20190325'            ;
	r_add.INSTITUTION_NUMBER             :=      v_inst                ;
	r_add.APPLICATION_NUMBER             :=      p_app_number  ;
	r_add.AUDIT_TRAIL                    :=      'Pricing-PA'          ;
	r_add.RECORD_TYPE                    :=      '001'                 ;
	r_add.LOCKING_COUNTER                :=      '0'                   ;
	r_add.DISTRIBUTOR_ID                 :=      '000000000000002222'  ;
	r_add.EMPLOYER_EMPLOYEE_ID           :=      '000000000000001111'  ;
	r_add.MOTO_INDICATOR                 :=      '001'                 ;
	r_add.DEBIT_INDICATOR                :=      '003'                 ;
	r_add.PAYWAVE_INDICATOR              :=      '003'                 ;
	r_add.CHIP_INDICATOR                 :=      '001'                 ;
	r_add.VISA_CHECKOUT_INDICATOR        :=      '001'                 ;

	 insert into CIS_APPL_CLIENT_ADDENDUM values r_Add;
   end;

	-- procedure createSettleInfo(p_app_number in varchar2)
	-- is
	-- r_sett cis_settlement_

	procedure createservices(p_app_number in varchar2, p_service_contract_id in varchar2, p_service_id in varchar2, p_client_type in varchar2)
	is
	r_ser cis_application_services%rowtype;
	begin
		for rec in (select distinct column_value from table(bw_util.split(p_service_id,',')))
		loop
		r_ser.INSTITUTION_NUMBER        :=      v_inst                 ;
		r_ser.APPLICATION_NUMBER        :=      p_app_number   ;
		r_ser.RECORD_DATE               :=      '20190325'             ;
		r_ser.SERVICE_CONTRACT_ID       :=      p_service_contract_id                  ;
		r_ser.SERVICE_ID                :=      rec.column_value                  ;
		r_ser.SERVICE_ASSIGNED          :=      '001'                  ;
		r_ser.SERVICE_INFO              :=      '0.00'                 ;
		r_ser.RECORD_TYPE               :=      '003'                  ;
		r_ser.CLIENT_TARIFF             :=      ''               ;
		r_ser.CLIENT_TYPE               :=     p_client_type                 ;

		insert into cis_application_services values r_ser;
		end loop;

	end;

    procedure createApplication(p_client_number in varchar2,
						p_group_client in varchar2,
					  p_parent_client in varchar2,
					  p_client_level in varchar2,
					  p_settlement_method in varchar2,
					  p_client_type in varchar2,
					  p_addr_category in varchar2,
					  p_billing_level in varchar2,
					  p_account_type in varchar2,
					  p_acct_currency in varchar2,
					  p_service_contract_id in varchar2,
					  p_service_id in varchar2,
					  p_entity_id in varchar2,
					  p_business_class in varchar2,
					  p_posting_method in varchar2,
					  p_condition_set in varchar2,
					  p_tran_tariff in  varchar2)
    is
	v_parent_appl varchar2(10);
	v_application_number varchar2(10);
	v_group_number varchar2(8);
	begin

   cleanup(p_client_number);
   v_application_number := getAppNumber(p_client_number);
   v_group_number := getGroupNumber(p_group_client);

   if trim(p_parent_client) is not null then
	v_parent_appl := getAppNumber(p_parent_client);
   end if;

	createApplDetail(p_app_number => v_application_number,
				   p_parent_appl => v_parent_appl,
				   p_group_number => v_group_number,
				   p_client_number => p_client_number,
				   p_entity_id =>  p_entity_id,
				   p_client_level => p_client_level,
				   p_settlement_method => p_settlement_method,
				   p_client_type => p_client_type,
				   p_service_contract_id => p_service_contract_id,
				   p_tran_tariff => p_tran_tariff,
				   p_business_class => p_business_class,
				   p_posting_method => p_posting_method,
				   p_condition_set => p_condition_set);

    --
     createAddress(v_application_number, p_addr_category); -- update categories
	 --

	createAccounts(v_application_number,
			  p_billing_level,  -- billing level
			  p_account_type, -- account type
			  p_acct_currency
			  );



	createClientAdd(v_application_number);  --

	if trim(p_service_id) is not null then

		createservices(v_application_number, p_service_contract_id, p_service_id , p_client_type );

	end if;
  end;

  Begin

---FS-EU Merchants-----
createApplication(p_client_number => '00000334', p_group_client=> '00000242',      p_parent_client => '',      p_client_level =>  '001',      p_business_class =>  '5999',      p_posting_method =>  '001',      p_condition_set =>  '000509',      p_client_type =>  '002',      p_addr_category => '001',      p_billing_level => '001',      p_account_type => '007,012',      p_acct_currency => '978',      p_service_contract_id => '110',      p_service_id => '009,102,107,109,201,202,300,301,609',       p_tran_tariff => '000509',  p_entity_id => '001',  p_settlement_method => '510'
      ); --TestCase       A"
createApplication(p_client_number => '00000333', p_group_client=> '00000242',      p_parent_client => '',      p_client_level =>  '001',      p_business_class =>  '5999',      p_posting_method =>  '001',      p_condition_set =>  '000502',      p_client_type =>  '002',      p_addr_category => '001',      p_billing_level => '001',      p_account_type => '007,012',      p_acct_currency => '978',      p_service_contract_id => '110',      p_service_id => '009,102,107,109,201,202,300,301,609',       p_tran_tariff => '000509',  p_entity_id => '002',  p_settlement_method => '518'
      ); --TestCase       A"
createApplication(p_client_number => '00000335', p_group_client=> '00000242',      p_parent_client => '',      p_client_level =>  '001',      p_business_class =>  '5999',      p_posting_method =>  '001',      p_condition_set =>  '000509',      p_client_type =>  '002',      p_addr_category => '001',      p_billing_level => '001',      p_account_type => '007,012',      p_acct_currency => '978',      p_service_contract_id => '110',      p_service_id => '009,102,107,109,201,202,300,301,609',       p_tran_tariff => '000509',  p_entity_id => '001',  p_settlement_method => '518'
      ); --TestCase       A"
createApplication(p_client_number => '00000337', p_group_client=> '00000242',      p_parent_client => '',      p_client_level =>  '001',      p_business_class =>  '5999',      p_posting_method =>  '001',      p_condition_set =>  '000502',      p_client_type =>  '002',      p_addr_category => '001',      p_billing_level => '001',      p_account_type => '007,012',      p_acct_currency => '978',      p_service_contract_id => '110',      p_service_id => '009,102,107,109,201,202,300,301,609',       p_tran_tariff => '000509',  p_entity_id => '002',  p_settlement_method => '510'	  
	  ); --TestCase       A"





  --
commit;
end;
/
