declare
  v_inst varchar2(8) := '00000006';
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
        r_acct.RECORD_DATE                         :=   '20190325'                  ;
        r_acct.BILLING_LEVEL                       :=   nvl(p_billing,'000')        ;
        r_acct.BANK_CLEARING_NUMBER                :=   '026009593'                 ;
        r_acct.SETTLEMENT_BANK_NAME                :=   'Pricing_Merchant'          ;
        r_acct.SETTLEMENT_BANK_CITY                :=   'SETTLEMENT_BANK_CITY'      ;
        r_acct.BANK_CONTACT_NAME                   :=   'BANK_CONTACT_NAME'         ;
        r_acct.BANK_TEL_NUMBER                     :=   '1236547890'                ;
        r_acct.COUNTER_BANK_ACCOUNT                :=   '217207982'                 ;
        r_acct.PAYMENT_REFERENCE                   :=   'PR_665522KT'               ;
        r_acct.AUDIT_TRAIL                         :=   'Pricing-PA'                ;
        r_acct.CORRESP_BANK_NUMBER                 :=   '654123009999'              ;
        r_acct.CORRESP_BANK_ACCOUNT                :=   '1122336655447'             ;
        r_acct.COUNTER_BANK_ACCOUNT_NAME           :=   'COUNTER_BANK_ACCOUNT_NAME' ;
        r_acct.STATEMENT_GENERATION                :=   '007'                       ;
        r_acct.ACCT_NUMBER_RBS                     :=   '6520122301'                ;
        r_acct.ACCT_NUMBER                         :=   null                  ;
        r_acct.STATEMENT_TYPE                      :=   '900'                       ;
        r_acct.RECEIVER_COUNTRY_CODE               :=   '076'                       ;
		r_acct.PAYMENT_BANK_CLIENT                 :=   '50027075'                  ;
        insert  into CIS_APPLICATION_ACCT_TYPE values r_acct;
        --dbms_output.put_line(r_currency.column_value ||'-'|| r_acctType.column_value);
      end loop;
    end loop; -- currency

  end;

  procedure createApplDetail(p_app_number in varchar2,
							 p_parent_appl in varchar2,
							 p_group_number in varchar2,
							 p_client_number in varchar2,
							-- p_entity_id in varchar2,
							 p_client_level in varchar2,
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
	r_appl.RECORD_DATE                        :=  '20190325';
	r_appl.RECORD_TYPE                        :=  '003';
	r_appl.CLIENT_NUMBER                      :=  p_client_number;
	r_appl.CLIENT_NUMBER_RBS                  :=  null;
	r_appl.APPLICATION_STATUS                 :=  '002';
	r_appl.LAST_NAME                          :=  'Application';
	r_appl.FIRST_NAME                         :=  'Dima';
	r_appl.CONTACT_NAME                       :=  'Pricing Merchant '||p_client_number;
	r_appl.VAT_REG_NUMBER                     :=  'BG123 122 1231';
	r_appl.REGISTRATION_NUMBER                :=  '123456';
	r_appl.CLIENT_TYPE                        :=  p_client_type;
	r_appl.RESIDENCE_STATUS                   :=  '000';
	r_appl.CLIENT_LANGUAGE                    :=  '001';
	r_appl.INSTITUTION_ACCT_OFFICER           :=  '001';
	r_appl.PROVIDER_ACCT_OFFICER              :=  '000';
	r_appl.CLIENT_BRANCH                      :=  '002';
	r_appl.SHORT_NAME                         :=  'Drugs';
	r_appl.COMPANY_NAME                       :=  'MicroHard';
	r_appl.LEGAL_FORM                         :=  '001';
	r_appl.TRADE_NAME                         :=  'Drugs';
	r_appl.BUSINESS_CLASS                     :=  p_business_class;
	r_appl.OUR_REFERENCE                      := lpad(p_client_number,15,'0');
	r_appl.SERVICE_CONTRACT_ID                :=  '051';
	r_appl.CONDITION_SET                      :=  p_condition_set;
	r_appl.LIMIT_CURRENCY                     :=  '840';
	r_appl.FLOOR_LIMIT                        :=  '0.0';
	r_appl.CLIENT_LEVEL                       :=  p_client_level;
	r_appl.SETTLEMENT_METHOD                  :=  '001';
	r_appl.POSTING_METHOD                     :=  p_posting_method;
	r_appl.PARENT_APPL_NUMBER                 :=  p_parent_appl;
	r_appl.LAST_AMENDMENT_DATE                :=  '20190326';
	r_appl.AUDIT_TRAIL                        :=  'Pricing-PA';
	r_appl.CLIENT_COUNTRY                     :=  '076';
	r_appl.CLIENT_CITY                        :=  'Charlotte';
	r_appl.GROUP_NUMBER                       :=  p_group_number;
	r_appl.CONTRACT_CATEGORY                  :=  '003';
	r_appl.POST_CODE                          :=  '92041';
	r_appl.CLIENT_STATE                       :=  '023';
	r_appl.MERCHANT_STREET                    :=  'Gates Street';
	r_appl.CLIENT_REGION                      :=  '000';
	r_appl.MIDDLE_NAME                        :=  'Middle Bill';
	r_appl.ECOMMERCE_INDICATOR                :=  '999';
	r_appl.SERVICE_TEL_NUMBER                 :=  '9898989898';
	r_appl.RISK_GROUP                         :=  '001';
	r_appl.LOCKING_COUNTER                    :=  1;
	r_appl.ACCUMULATOR_SCHEME                 :=  '000';
	r_appl.APPL_PROC_INVOKED                  :=  0;
	r_appl.MC_IP_QUALIFICATION                :=  '000';
	r_appl.MC_IP_VALUE                        :=  null;
	r_appl.VISA_IP_QUALIFICATION              :=  '000';
	r_appl.VISA_IP_VALUE                      :=  null;
	r_appl.RCC                                :=  null;
	r_appl.CROSS_BORDER_FEE_IND               :=  '000';
	r_appl.DOMESTIC_MCC                       :=  '000';
	r_appl.CLIENT_SCHEME                      :=  '000000';
	r_appl.COUNTRY_OF_ISSUE                   :=  '076';
	r_appl.WEBSITE_ADDRESS                    :=  'www.MicroHard.com';
	r_appl.TRANSFER_METHOD                    :=  '000001';
	r_appl.BIRTH_COUNTRY                      :=  '076';
	r_appl.CLIENT_STATUS                      :=  '001';
	r_appl.MERCHANT_TRAN_TARIFF               :=   p_tran_tariff;
	r_appl.CONTRACT_REGION                    :=  '999';
	r_appl.VAT_REGION                         :=  null;
	r_appl.VAT_COUNTRY                        :=  '076';
	r_appl.DINERS_INTES_CODE                  :=  null;
	--r_appl.Entity_ID                          :=  p_entity_id;
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
		r_addr.RECORD_DATE            := '20190325'                 ;
		r_addr.ADDR_LINE_1            := '7350 S US HIGHWAY 447 ||CAT'||rec.column_value    ;
		r_addr.ADDR_LINE_2            := '7350 S US HIGHWAY 448'    ;
		r_addr.ADDR_LINE_3            := '7350 S US HIGHWAY 4410'   ;
		r_addr.POST_CODE              := '34480'                    ;
		r_addr.ADDR_CLIENT_CITY       := 'OCALA'                    ;
		r_addr.CLIENT_COUNTRY         := '076'                      ;
		r_addr.AUDIT_TRAIL            := 'Pricing-PA'               ;
		r_addr.RECORD_TYPE            := '003'                      ;
		r_addr.EMAIL_ADDR             := 'email@rs2.com'            ;
		r_addr.DELIVERY_METHOD        := '000'                      ;
		r_addr.EFFECTIVE_DATE         := '20190325'                 ;
		r_addr.GROUP_SPECIFIC         := '000'                      ;
		r_addr.CLIENT_STATE           := '023'                      ;

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
	r_add.REPORTING_CLIENT               :=      '00000071'            ;

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
					  p_client_type in varchar2,
					  p_addr_category in varchar2,
					  p_billing_level in varchar2,
					  p_account_type in varchar2,
					  p_acct_currency in varchar2,
					  p_service_contract_id in varchar2,
					  p_service_id in varchar2,
					 -- p_entity_id in varchar2,
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
				  -- p_entity_id =>  p_entity_id,
				   p_client_level => p_client_level,
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

---Finfarma Merchants-----
createApplication(p_client_number => '00000235', p_group_client=> '00000144',      p_parent_client => '',      p_client_level =>  '001',      p_business_class =>  '4011',      p_posting_method =>  '001',      p_condition_set =>  '000005',      p_client_type =>  '002',      p_addr_category => '001',      p_billing_level => '001',      p_account_type => '050,051,052,053,055,056,060,061',      p_acct_currency => '986',      p_service_contract_id => '101',      p_service_id => '102,200,201,300,301,302,303,304,306,307,308,309,310,312,716',       p_tran_tariff => '000001'
      ); --TestCase       A"  
  --
commit;
end;
/