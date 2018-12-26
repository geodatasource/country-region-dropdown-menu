(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        try {
            module.exports = factory(require());
        } catch (e) {
            module.exports = factory();
        }
    } else {
        root.gds = factory(root);
    }
}(this, function() {
    "use strict";

    var gdsClass = "gds-cr";
    var countryString = "Please select a country.";
    var regionString = "Please select a region.";
    var cityString = "Please select a city.";
    var showEmptyCountryOption = true;
    var showEmptyRegionOption = true;
    var showEmptyCityOption = true;
    var country_region = [];

    var initialise = function() {
        var countryDropDownList = document.getElementsByClassName(gdsClass);
        for (var i=0; i<countryDropDownList.length; i++) {
            generateCountryField(countryDropDownList[i]);
        }

        // jQuery to display country flag
        jQuery.widget("custom.iconselectmenu", jQuery.ui.selectmenu, {
            _renderItem: function(ul, item) {
                var li = jQuery("<li>"),
                    wrapper = jQuery("<div>", {text: item.label});

                if (item.disabled) {
                    li.addClass("ui-state-disabled");
                }

                jQuery("<span>", {
                    style: item.element.attr("data-style"),
                    "class": "ui-icon " + item.element.attr("data-class")
                }).appendTo(wrapper);

                return li.append(wrapper).appendTo(ul);
            }
        });
        jQuery(".gds-countryflag").iconselectmenu().iconselectmenu("menuWidget").addClass("ui-menu-icons customicons");
        jQuery(".gds-countryflag").iconselectmenu({ change: function(event) {
            var el = (event.target);
            var countryElement;
            for (var i=0; i<countryDropDownList.length; i++) {
                var ddl = countryDropDownList[i];
                if(ddl === el) {
                    countryElement = ddl;
                }
            }
            var regionID = countryElement.getAttribute("country-data-region-id");
            var regionElement = document.getElementById(regionID);
            generateRegionField(countryElement, regionElement);
        }});
    };

    var generateCountryField = function(countryElement) {
        var loaded = countryElement.getAttribute("data-gds-loaded");
        if (loaded === "true") {
            return;
        }

        countryElement.length = 0;
        var customCountryOptionString = countryElement.getAttribute("country-data-default-option");
        var defaultCountryOptionString = customCountryOptionString ? customCountryOptionString : countryString;
        var defaultCountrySelectedValue = countryElement.getAttribute("country-data-default-value");
        var foundIndex = 0;

        if (showEmptyCountryOption) {
            countryElement.options[0] = new Option(defaultCountryOptionString, '');
        }

        translate(countryElement);
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            (countryElement.options[countryElement.length] = new Option(country_region[i][1], value)).setAttribute("data-class", cc_iso.toLowerCase());
            if (defaultCountrySelectedValue != null && (defaultCountrySelectedValue === value || defaultCountrySelectedValue === cc_iso)) {
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
            }
        }

        countryElement.selectedIndex = foundIndex;

        var regionID = countryElement.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        if (regionElement) {
            initialiseRegionField(regionElement);

            countryElement.onchange = function() {
                generateRegionField(countryElement, regionElement);
            };

            if (defaultCountrySelectedValue !== null && countryElement.selectedIndex > 0) {
                generateRegionField(countryElement, regionElement);
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElement.selectedIndex - 1: countryElement.selectedIndex;
                    var data = country_region[index][3];
                    setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
                }
            } else if (showEmptyCountryOption === false) {
                generateRegionField(countryElement, regionElement);
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        countryElement.setAttribute("data-gds-loaded", "true");
    };

    var translate = function(countryElement){
        var region_lang = countryElement.getAttribute("data-language");
        var get = new Gettext({ 'domain' : region_lang});

        //get translated country name
        var ad_country=get.gettext("Andorra_AD_C");var ae_country=get.gettext("United Arab Emirates_AE_C");var af_country=get.gettext("Afghanistan_AF_C");var ag_country=get.gettext("Antigua and Barbuda_AG_C");var ai_country=get.gettext("Anguilla_AI_C");var al_country=get.gettext("Albania_AL_C");var am_country=get.gettext("Armenia_AM_C");var ao_country=get.gettext("Angola_AO_C");var aq_country=get.gettext("Antarctica_AQ_C");var ar_country=get.gettext("Argentina_AR_C");var as_country=get.gettext("American Samoa_AS_C");var at_country=get.gettext("Austria_AT_C");var au_country=get.gettext("Australia_AU_C");var aw_country=get.gettext("Aruba_AW_C");var ax_country=get.gettext("Aland Islands_AX_C");var az_country=get.gettext("Azerbaijian_AZ_C");
        var ba_country=get.gettext("Bosnia and Herzegovina_BA_C");var bb_country=get.gettext("Barbados_BB_C");var bd_country=get.gettext("Bangladesh_BD_C");var be_country=get.gettext("Belgium_BE_C");var bf_country=get.gettext("Burkina Faso_BF_C");var bg_country=get.gettext("Bulgaria_BG_C");var bh_country=get.gettext("Bahrain_BH_C");var bi_country=get.gettext("Burundi_BI_C");var bj_country=get.gettext("Benin_BJ_C");var bl_country=get.gettext("Saint Barthelemy_BL_C");var bm_country=get.gettext("Bermuda_BM_C");var bn_country=get.gettext("Brunei Darussalam_BN_C");var bo_country=get.gettext("Bolivia, Plurinational State of_BO_C");var bq_country=get.gettext("Bonaire, Sint Eustatius and Saba_BQ_C");var br_country=get.gettext("Brazil_BR_C");var bs_country=get.gettext("Bahamas_BS_C");var bt_country=get.gettext("Bhutan_BT_C");var bw_country=get.gettext("Botswana_BW_C");var by_country=get.gettext("Belarus_BY_C");var bz_country=get.gettext("Belize_BZ_C");
        var ca_country=get.gettext("Canada_CA_C");var cc_country=get.gettext("Cocos (Keeling) Islands_CC_C");var cd_country=get.gettext("Congo, The Democratic Republic of The_CD_C");var cf_country=get.gettext("Central African Republic_CF_C");var cg_country=get.gettext("Congo_CG_C");var ch_country=get.gettext("Switzerland_CH_C");var ci_country=get.gettext("Cote D'ivoire_CI_C");var ck_country=get.gettext("Cook Islands_CK_C");var cl_country=get.gettext("Chile_CL_C");var cm_country=get.gettext("Cameroon_CM_C");var cn_country=get.gettext("China_CN_C");var co_country=get.gettext("Colombia_CO_C");var cr_country=get.gettext("Costa Rica_CR_C");var cu_country=get.gettext("Cuba_CU_C");var cv_country=get.gettext("Cabo Verde_CV_C");var cw_country=get.gettext("Curacao_CW_C");var cx_country=get.gettext("Christmas Island_CX_C");var cy_country=get.gettext("Cyprus_CY_C");var cz_country=get.gettext("Czech Republic_CZ_C");
        var de_country=get.gettext("Germany_DE_C");var dj_country=get.gettext("Djibouti_DJ_C");var dk_country=get.gettext("Denmark_DK_C");var dm_country=get.gettext("Dominica_DM_C");var do1_country=get.gettext("Dominican Republic_DO_C");var dz_country=get.gettext("Algeria_DZ_C");
        var ec_country=get.gettext("Ecuador_EC_C");var ee_country=get.gettext("Estonia_EE_C");var eg_country=get.gettext("Egypt_EG_C");var eh_country=get.gettext("Western Sahara_EH_C");var er_country=get.gettext("Eritrea_ER_C");var es_country=get.gettext("Spain_ES_C");var et_country=get.gettext("Ethiopia_ET_C");
        var fi_country=get.gettext("Finland_FI_C");var fj_country=get.gettext("Fiji_FJ_C");var fk_country=get.gettext("Falkland Islands (Malvinas)_FK_C");var fm_country=get.gettext("Micronesia, Federated States of_FM_C");var fo_country=get.gettext("Faroe Islands_FO_C");var fr_country=get.gettext("France_FR_C");
        var ga_country=get.gettext("Gabon_GA_C");var gb_country=get.gettext("United Kingdom_GB_C");var gd_country=get.gettext("Grenada_GD_C");var ge_country=get.gettext("Georgia_GE_C");var gf_country=get.gettext("French Guiana_GF_C");var gg_country=get.gettext("Guernsey_GG_C");var gh_country=get.gettext("Ghana_GH_C");var gi_country=get.gettext("Gibraltar_GI_C");var gl_country=get.gettext("Greenland_GL_C");var gm_country=get.gettext("Gambia_GM_C");var gn_country=get.gettext("Guinea_GN_C");var gp_country=get.gettext("Guadeloupe_GP_C");var gq_country=get.gettext("Equatorial Guinea_GQ_C");var gr_country=get.gettext("Greece_GR_C");var gs_country=get.gettext("South Georgia and The South Sandwich Islands_GS_C");var gt_country=get.gettext("Guatemala_GT_C");var gu_country=get.gettext("Guam_GU_C");var gw_country=get.gettext("Guinea-Bissau_GW_C");var gy_country=get.gettext("Guyana_GY_C");
        var hk_country=get.gettext("Hong Kong_HK_C");var hn_country=get.gettext("Honduras_HN_C");var hr_country=get.gettext("Croatia_HR_C");var ht_country=get.gettext("Haiti_HT_C");var hu_country=get.gettext("Hungary_HU_C");
        var id_country=get.gettext("Indonesia_ID_C");var ie_country=get.gettext("Ireland_IE_C");var il_country=get.gettext("Israel_IL_C");var im_country=get.gettext("Isle of Man_IM_C");var in1_country=get.gettext("India_IN_C");var io_country=get.gettext("British Indian Ocean Territory_IO_C");var iq_country=get.gettext("Iraq_IQ_C");var ir_country=get.gettext("Iran, Islamic Republic of_IR_C");var is_country=get.gettext("Iceland_IS_C");var it_country=get.gettext("Italy_IT_C");
        var je_country=get.gettext("Jersey_JE_C");var jm_country=get.gettext("Jamaica_JM_C");var jo_country=get.gettext("Jordan_JO_C");var jp_country=get.gettext("Japan_JP_C");
        var ke_country=get.gettext("Kenya_KE_C");var kg_country=get.gettext("Kyrgyzstan_KG_C");var kh_country=get.gettext("Cambodia_KH_C");var ki_country=get.gettext("Kiribati_KI_C");var km_country=get.gettext("Comoros_KM_C");var kn_country=get.gettext("Saint Kitts and Nevis_KN_C");var kp_country=get.gettext("Korea, Democratic People's Republic of_KP_C");var kr_country=get.gettext("Korea, Republic of_KR_C");var kw_country=get.gettext("Kuwait_KW_C");var ky_country=get.gettext("Cayman Islands_KY_C");var kz_country=get.gettext("Kazakhstan_KZ_C");
        var la_country=get.gettext("Lao People's Democratic Republic_LA_C");var lb_country=get.gettext("Lebanon_LB_C");var lc_country=get.gettext("Saint Lucia_LC_C");var li_country=get.gettext("Liechtenstein_LI_C");var lk_country=get.gettext("Sri Lanka_LK_C");var lr_country=get.gettext("Liberia_LR_C");var ls_country=get.gettext("Lesotho_LS_C");var lt_country=get.gettext("Lithuania_LT_C");var lu_country=get.gettext("Luxembourg_LU_C");var lv_country=get.gettext("Latvia_LV_C");var ly_country=get.gettext("Libya_LY_C");
        var ma_country=get.gettext("Morocco_MA_C");var mc_country=get.gettext("Monaco_MC_C");var md_country=get.gettext("Moldova, Republic of_MD_C");var me_country=get.gettext("Montenegro_ME_C");var mf_country=get.gettext("Saint Martin (French Part)_MF_C");var mg_country=get.gettext("Madagascar_MG_C");var mh_country=get.gettext("Marshall Islands_MH_C");var mk_country=get.gettext("Macedonia, The Former Yugoslav Republic of_MK_C");var ml_country=get.gettext("Mali_ML_C");var mm_country=get.gettext("Myanmar_MM_C");var mn_country=get.gettext("Mongolia_MN_C");var mo_country=get.gettext("Macao_MO_C");var mp_country=get.gettext("Northern Mariana Islands_MP_C");var mq_country=get.gettext("Martinique_MQ_C");var mr_country=get.gettext("Mauritania_MR_C");var ms_country=get.gettext("Montserrat_MS_C");var mt_country=get.gettext("Malta_MT_C");var mu_country=get.gettext("Mauritius_MU_C");var mv_country=get.gettext("Maldives_MV_C");var mw_country=get.gettext("Malawi_MW_C");var mx_country=get.gettext("Mexico_MX_C");var my_country=get.gettext("Malaysia_MY_C");var mz_country=get.gettext("Mozambique_MZ_C");
        var na_country=get.gettext("Namibia_NA_C");var nc_country=get.gettext("New Caledonia_NC_C");var ne_country=get.gettext("Niger_NE_C");var nf_country=get.gettext("Norfolk Island_NF_C");var ng_country=get.gettext("Nigeria_NG_C");var ni_country=get.gettext("Nicaragua_NI_C");var nl_country=get.gettext("Netherlands_NL_C");var no_country=get.gettext("Norway_NO_C");var np_country=get.gettext("Nepal_NP_C");var nr_country=get.gettext("Nauru_NR_C");var nu_country=get.gettext("Niue_NU_C");var nz_country=get.gettext("New Zealand_NZ_C");
        var om_country=get.gettext("Oman_OM_C");
        var pa_country=get.gettext("Panama_PA_C");var pe_country=get.gettext("Peru_PE_C");var pf_country=get.gettext("French Polynesia_PF_C");var pg_country=get.gettext("Papua New Guinea_PG_C");var ph_country=get.gettext("Philippines_PH_C");var pk_country=get.gettext("Pakistan_PK_C");var pl_country=get.gettext("Poland_PL_C");var pm_country=get.gettext("Saint Pierre and Miquelon_PM_C");var pn_country=get.gettext("Pitcairn_PN_C");var pr_country=get.gettext("Puerto Rico_PR_C");var ps_country=get.gettext("Palestine, State of_PS_C");var pt_country=get.gettext("Portugal_PT_C");var pw_country=get.gettext("Palau_PW_C");var py_country=get.gettext("Paraguay_PY_C");
        var qa_country=get.gettext("Qatar_QA_C");
        var re_country=get.gettext("Reunion_RE_C");var ro_country=get.gettext("Romania_RO_C");var rs_country=get.gettext("Serbia_RS_C");var ru_country=get.gettext("Russian Federation_RU_C");var rw_country=get.gettext("Rwanda_RW_C");
        var sa_country=get.gettext("Saudi Arabia_SA_C");var sb_country=get.gettext("Solomon Islands_SB_C");var sc_country=get.gettext("Seychelles_SC_C");var sd_country=get.gettext("Sudan_SD_C");var se_country=get.gettext("Sweden_SE_C");var sg_country=get.gettext("Singapore_SG_C");    var sh_country=get.gettext("Saint Helena, Ascension and Tristan Da Cunha_SH_C");var si_country=get.gettext("Slovenia_SI_C");var sj_country=get.gettext("Svalbard and Jan Mayen_SJ_C");var sk_country=get.gettext("Slovakia_SK_C");var sl_country=get.gettext("Sierra Leone_SL_C");var sm_country=get.gettext("San Marino_SM_C");var sn_country=get.gettext("Senegal_SN_C");var so_country=get.gettext("Somalia_SO_C");var sr_country=get.gettext("Suriname_SR_C");var ss_country=get.gettext("South Sudan_SS_C");var st_country=get.gettext("Sao Tome and Principe_ST_C");var sv_country=get.gettext("El Salvador_SV_C");var sx_country=get.gettext("Sint Maarten (Dutch Part)_SX_C");var sy_country=get.gettext("Syrian Arab Republic_SY_C");var sz_country=get.gettext("Swaziland_SZ_C");
        var tc_country=get.gettext("Turks and Caicos Islands_TC_C");var td_country=get.gettext("Chad_TD_C");var tf_country=get.gettext("French Southern Territories_TF_C");var tg_country=get.gettext("Togo_TG_C");var th_country=get.gettext("Thailand_TH_C");var tj_country=get.gettext("Tajikistan_TJ_C");var tk_country=get.gettext("Tokelau_TK_C");var tl_country=get.gettext("Timor-Leste_TL_C");var tm_country=get.gettext("Turkmenistan_TM_C");var tn_country=get.gettext("Tunisia_TN_C");var to_country=get.gettext("Tonga_TO_C");var tr_country=get.gettext("Turkey_TR_C");var tt_country=get.gettext("Trinidad and Tobago_TT_C");var tv_country=get.gettext("Tuvalu_TV_C");var tw_country=get.gettext("Taiwan, Province of China_TW_C");var tz_country=get.gettext("Tanzania, United Republic of_TZ_C");
        var ua_country=get.gettext("Ukraine_UA_C");var ug_country=get.gettext("Uganda_UG_C");var um_country=get.gettext("United States Minor Outlying Islands_UM_C");var us_country=get.gettext("United States_US_C");var uy_country=get.gettext("Uruguay_UY_C");var uz_country=get.gettext("Uzbekistan_UZ_C");
        var va_country=get.gettext("Holy See_VA_C");var vc_country=get.gettext("Saint Vincent and The Grenadines_VC_C");var ve_country=get.gettext("Venezuela, Bolivarian Republic of_VE_C");var vg_country=get.gettext("Virgin Islands, British_VG_C");var vi_country=get.gettext("Virgin Islands, U.S._VI_C");var vn_country=get.gettext("Viet Nam_VN_C");var vu_country=get.gettext("Vanuatu_VU_C");
        var wf_country=get.gettext("Wallis and Futuna_WF_C");var ws_country=get.gettext("Samoa_WS_C");
        var ye_country=get.gettext("Yemen_YE_C");var yt_country=get.gettext("Mayotte_YT_C");
        var za_country=get.gettext("South Africa_ZA_C");var zm_country=get.gettext("Zambia_ZM_C");var zw_country=get.gettext("Zimbabwe_ZW_C");;

        //region data by country
        var ad_region=["Andorra la Vella_AD","Canillo_AD","Encamp_AD","Escaldes-Engordany_AD","La Massana_AD","Ordino_AD","Sant Julia de Loria_AD"];
        var ae_region=["\'Ajman_AE","Abu Zaby_AE","Al Fujayrah_AE","Ash Shariqah_AE","Dubayy_AE","Ra's al Khaymah_AE","Umm al Qaywayn_AE"];
        var af_region=["Badakhshan_AF","Badghis_AF","Baghlan_AF","Balkh_AF","Bamyan_AF","Daykundi_AF","Farah_AF","Faryab_AF","Ghazni_AF","Ghor_AF","Helmand_AF","Herat_AF","Jowzjan_AF","Kabul_AF","Kandahar_AF","Kapisa_AF","Khost_AF","Kunar_AF","Kunduz_AF","Laghman_AF","Logar_AF","Nangarhar_AF","Nimroz_AF","Nuristan_AF","Paktika_AF","Paktiya_AF","Panjshayr_AF","Parwan_AF","Samangan_AF","Sar-e Pul_AF","Takhar_AF","Uruzgan_AF","Wardak_AF","Zabul_AF"];
        var ag_region=["Barbuda_AG","Redonda_AG","Saint George_AG","Saint John_AG","Saint Mary_AG","Saint Paul_AG","Saint Peter_AG","Saint Philip_AG"];
        var ai_region=["Anguilla_AI"];
        var al_region=["Berat_AL","Diber_AL","Durres_AL","Elbasan_AL","Fier_AL","Gjirokaster_AL","Korce_AL","Kukes_AL","Lezhe_AL","Shkoder_AL","Tirane_AL","Vlore_AL"];
        var am_region=["Aragacotn_AM","Ararat_AM","Armavir_AM","Erevan_AM","Gegark'unik'_AM","Kotayk'_AM","Lori_AM","Sirak_AM","Syunik'_AM","Tavus_AM","Vayoc Jor_AM"];
        var ao_region=["Bengo_AO","Benguela_AO","Bie_AO","Cabinda_AO","Cunene_AO","Huambo_AO","Huila_AO","Kuando Kubango_AO","Kwanza Norte_AO","Kwanza Sul_AO","Luanda_AO","Lunda Norte_AO","Lunda Sul_AO","Malange_AO","Moxico_AO","Namibe_AO","Uige_AO","Zaire_AO"];
        var aq_region=["Antarctica_AQ"];
        var ar_region=["Buenos Aires_AR","Catamarca_AR","Chaco_AR","Chubut_AR","Ciudad Autonoma de Buenos Aires_AR","Cordoba_AR","Corrientes_AR","Entre Rios_AR","Formosa_AR","Jujuy_AR","La Pampa_AR","La Rioja_AR","Mendoza_AR","Misiones_AR","Neuquen_AR","Rio Negro_AR","Salta_AR","San Juan_AR","San Luis_AR","Santa Cruz_AR","Santa Fe_AR","Santiago del Estero_AR","Tierra del Fuego_AR","Tucuman_AR"];
        var as_region=["Eastern District_AS","Western District_AS"];
        var at_region=["Burgenland_AT","Karnten_AT","Niederosterreich_AT","Oberosterreich_AT","Salzburg_AT","Steiermark_AT","Tirol_AT","Vorarlberg_AT","Wien_AT"];
        var au_region=["Australian Capital Territory_AU","New South Wales_AU","Northern Territory_AU","Queensland_AU","South Australia_AU","Tasmania_AU","Victoria_AU","Western Australia_AU"];
        var aw_region=["Aruba_AW"];
        var ax_region=["Eckeroe_AX","Finstroem_AX","Hammarland_AX","Jomala_AX","Lemland_AX","Mariehamn_AX","Saltvik_AX","Sund_AX"];
        var az_region=["Abseron_AZ","Agcabadi_AZ","Agdam_AZ","Agdas_AZ","Agstafa_AZ","Agsu_AZ","Astara_AZ","Baki_AZ","Balakan_AZ","Barda_AZ","Beylaqan_AZ","Bilasuvar_AZ","Cabrayil_AZ","Calilabad_AZ","Daskasan_AZ","Fuzuli_AZ","Gadabay_AZ","Ganca_AZ","Goranboy_AZ","Goycay_AZ","Goygol_AZ","Haciqabul_AZ","Imisli_AZ","Ismayilli_AZ","Kalbacar_AZ","Kurdamir_AZ","Lacin_AZ","Lankaran_AZ","Lerik_AZ","Masalli_AZ","Mingacevir_AZ","Naftalan_AZ","Naxcivan_AZ","Neftcala_AZ","Oguz_AZ","Qabala_AZ","Qax_AZ","Qazax_AZ","Qobustan_AZ","Quba_AZ","Qubadli_AZ","Qusar_AZ","Saatli_AZ","Sabirabad_AZ","Saki_AZ","Salyan_AZ","Samaxi_AZ","Samkir_AZ","Samux_AZ","Sirvan_AZ","Siyazan_AZ","Sumqayit_AZ","Susa_AZ","Tartar_AZ","Tovuz_AZ","Ucar_AZ","Xacmaz_AZ","Xankandi_AZ","Xizi_AZ","Xocali_AZ","Xocavand_AZ","Yardimli_AZ","Yevlax_AZ","Zangilan_AZ","Zaqatala_AZ","Zardab_AZ"];
        var ba_region=["Brcko distrikt_BA","Federacija Bosne i Hercegovine_BA","Republika Srpska_BA"];
        var bb_region=["Christ Church_BB","Saint Andrew_BB","Saint George_BB","Saint James_BB","Saint John_BB","Saint Joseph_BB","Saint Lucy_BB","Saint Michael_BB","Saint Peter_BB","Saint Philip_BB","Saint Thomas_BB"];
        var bd_region=["Barisal_BD","Chittagong_BD","Dhaka_BD","Khulna_BD","Rajshahi_BD","Rangpur_BD","Sylhet_BD"];
        var be_region=["Antwerpen_BE","Brabant wallon_BE","Brussels Hoofdstedelijk Gewest_BE","Hainaut_BE","Liege_BE","Limburg_BE","Luxembourg_BE","Namur_BE","Oost-Vlaanderen_BE","Vlaams-Brabant_BE","West-Vlaanderen_BE"];
        var bf_region=["Bale_BF","Bam_BF","Banwa_BF","Bazega_BF","Bougouriba_BF","Boulgou_BF","Boulkiemde_BF","Comoe_BF","Ganzourgou_BF","Gnagna_BF","Gourma_BF","Houet_BF","Ioba_BF","Kadiogo_BF","Kenedougou_BF","Komondjari_BF","Kompienga_BF","Kossi_BF","Koulpelogo_BF","Kouritenga_BF","Kourweogo_BF","Leraba_BF","Loroum_BF","Mouhoun_BF","Nahouri_BF","Namentenga_BF","Nayala_BF","Noumbiel_BF","Oubritenga_BF","Oudalan_BF","Passore_BF","Poni_BF","Sanguie_BF","Sanmatenga_BF","Seno_BF","Sissili_BF","Soum_BF","Sourou_BF","Tapoa_BF","Tuy_BF","Yagha_BF","Yatenga_BF","Ziro_BF","Zondoma_BF","Zoundweogo_BF"];
        var bg_region=["Blagoevgrad_BG","Burgas_BG","Dobrich_BG","Gabrovo_BG","Haskovo_BG","Kardzhali_BG","Kyustendil_BG","Lovech_BG","Montana_BG","Pazardzhik_BG","Pernik_BG","Pleven_BG","Plovdiv_BG","Razgrad_BG","Ruse_BG","Shumen_BG","Silistra_BG","Sliven_BG","Smolyan_BG","Sofia_BG","Sofia (stolitsa)_BG","Stara Zagora_BG","Targovishte_BG","Varna_BG","Veliko Tarnovo_BG","Vidin_BG","Vratsa_BG","Yambol_BG"];
        var bh_region=["Al 'Asimah_BH","Al Janubiyah_BH","Al Muharraq_BH","Ash Shamaliyah_BH"];
        var bi_region=["Bubanza_BI","Bujumbura Mairie_BI","Bururi_BI","Cankuzo_BI","Cibitoke_BI","Gitega_BI","Karuzi_BI","Kayanza_BI","Kirundo_BI","Makamba_BI","Muramvya_BI","Muyinga_BI","Mwaro_BI","Ngozi_BI","Rutana_BI","Ruyigi_BI"];
        var bj_region=["Alibori_BJ","Atacora_BJ","Atlantique_BJ","Borgou_BJ","Collines_BJ","Couffo_BJ","Donga_BJ","Littoral_BJ","Mono_BJ","Oueme_BJ","Plateau_BJ","Zou_BJ"];
        var bl_region=["Saint Barthelemy_BL"];
        var bm_region=["Hamilton_BM","Saint George_BM"];
        var bn_region=["Belait_BN","Brunei-Muara_BN","Temburong_BN","Tutong_BN"];
        var bo_region=["Chuquisaca_BO","Cochabamba_BO","El Beni_BO","La Paz_BO","Oruro_BO","Pando_BO","Potosi_BO","Santa Cruz_BO","Tarija_BO"];
        var bq_region=["Bonaire_BQ","Saba_BQ","Sint Eustatius_BQ"];
        var br_region=["Acre_BR","Alagoas_BR","Amapa_BR","Amazonas_BR","Bahia_BR","Ceara_BR","Distrito Federal_BR","Espirito Santo_BR","Goias_BR","Maranhao_BR","Mato Grosso_BR","Mato Grosso do Sul_BR","Minas Gerais_BR","Para_BR","Paraiba_BR","Parana_BR","Pernambuco_BR","Piaui_BR","Rio de Janeiro_BR","Rio Grande do Norte_BR","Rio Grande do Sul_BR","Rondonia_BR","Roraima_BR","Santa Catarina_BR","Sao Paulo_BR","Sergipe_BR","Tocantins_BR"];
        var bs_region=["Central Andros_BS","City of Freeport_BS","East Grand Bahama_BS","Harbour Island_BS","Hope Town_BS","Long Island_BS","New Providence_BS","South Eleuthera_BS"];
        var bt_region=["Bumthang_BT","Chhukha_BT","Dagana_BT","Gasa_BT","Haa_BT","Lhuentse_BT","Monggar_BT","Paro_BT","Pemagatshel_BT","Punakha_BT","Samdrup Jongkhar_BT","Samtse_BT","Thimphu_BT","Trashi Yangtse_BT","Trashigang_BT","Trongsa_BT","Tsirang_BT","Wangdue Phodrang_BT","Zhemgang_BT"];
        var bw_region=["Central_BW","Ghanzi_BW","Kgalagadi_BW","Kgatleng_BW","Kweneng_BW","North East_BW","North West_BW","South East_BW","Southern_BW"];
        var by_region=["Brestskaya voblasts'_BY","Homyel'skaya voblasts'_BY","Horad Minsk_BY","Hrodzenskaya voblasts'_BY","Mahilyowskaya voblasts'_BY","Minskaya voblasts'_BY","Vitsyebskaya voblasts'_BY"];
        var bz_region=["Belize_BZ","Cayo_BZ","Corozal_BZ","Orange Walk_BZ","Stann Creek_BZ","Toledo_BZ"];
        var ca_region=["Alberta_CA","British Columbia_CA","Manitoba_CA","New Brunswick_CA","Newfoundland and Labrador_CA","Northwest Territories_CA","Nova Scotia_CA","Nunavut_CA","Ontario_CA","Prince Edward Island_CA","Quebec_CA","Saskatchewan_CA","Yukon_CA"];
        var cc_region=["Cocos (Keeling) Islands_CC"];
        var cd_region=["Bas-Uele_CD","Equateur_CD","Haut-Katanga_CD","Haut-Lomami_CD","Haut-Uele_CD","Ituri_CD","Kasai_CD","Kasai Central_CD","Kasai Oriental_CD","Kinshasa_CD","Kongo Central_CD","Kwango_CD","Kwilu_CD","Lomami_CD","Lualaba_CD","Mai-Ndombe_CD","Maniema_CD","Mongala_CD","Nord-Kivu_CD","Nord-Ubangi_CD","Sankuru_CD","Sud-Kivu_CD","Sud-Ubangi_CD","Tanganyika_CD","Tshopo_CD","Tshuapa_CD"];
        var cf_region=["Bamingui-Bangoran_CF","Bangui_CF","Basse-Kotto_CF","Gribingui_CF","Haut-Mbomou_CF","Haute-Kotto_CF","Kemo-Gribingui_CF","Lobaye_CF","Mambere-Kadei_CF","Mbomou_CF","Nana-Mambere_CF","Ombella-Mpoko_CF","Ouaka_CF","Ouham_CF","Ouham-Pende_CF","Sangha_CF","Vakaga_CF"];
        var cg_region=["Bouenza_CG","Brazzaville_CG","Cuvette_CG","Cuvette-Ouest_CG","Lekoumou_CG","Likouala_CG","Niari_CG","Plateaux_CG","Pointe-Noire_CG","Pool_CG","Sangha_CG"];
        var ch_region=["Aargau_CH","Appenzell Ausserrhoden_CH","Appenzell Innerrhoden_CH","Basel-Landschaft_CH","Basel-Stadt_CH","Bern_CH","Fribourg_CH","Geneve_CH","Glarus_CH","Graubunden_CH","Jura_CH","Luzern_CH","Neuchatel_CH","Nidwalden_CH","Obwalden_CH","Sankt Gallen_CH","Schaffhausen_CH","Schwyz_CH","Solothurn_CH","Thurgau_CH","Ticino_CH","Uri_CH","Valais_CH","Vaud_CH","Zug_CH","Zurich_CH"];
        var ci_region=["Abidjan_CI","Bas-Sassandra_CI","Comoe_CI","Denguele_CI","Goh-Djiboua_CI","Lacs_CI","Lagunes_CI","Montagnes_CI","Sassandra-Marahoue_CI","Savanes_CI","Vallee du Bandama_CI","Woroba_CI","Yamoussoukro_CI","Zanzan_CI"];
        var ck_region=["Cook Islands_CK"];
        var cl_region=["Aisen del General Carlos Ibanez del Campo_CL","Antofagasta_CL","Arica y Parinacota_CL","Atacama_CL","Biobio_CL","Coquimbo_CL","La Araucania_CL","Libertador General Bernardo O'Higgins_CL","Los Lagos_CL","Los Rios_CL","Magallanes_CL","Maule_CL","Region Metropolitana de Santiago_CL","Tarapaca_CL","Valparaiso_CL"];
        var cm_region=["Adamaoua_CM","Centre_CM","Est_CM","Extreme-Nord_CM","Littoral_CM","Nord_CM","Nord-Ouest_CM","Ouest_CM","Sud_CM","Sud-Ouest_CM"];
        var cn_region=["Anhui_CN","Beijing_CN","Chongqing_CN","Fujian_CN","Gansu_CN","Guangdong_CN","Guangxi_CN","Guizhou_CN","Hainan_CN","Hebei_CN","Heilongjiang_CN","Henan_CN","Hubei_CN","Hunan_CN","Jiangsu_CN","Jiangxi_CN","Jilin_CN","Liaoning_CN","Nei Mongol_CN","Ningxia_CN","Qinghai_CN","Shaanxi_CN","Shandong_CN","Shanghai_CN","Shanxi_CN","Sichuan_CN","Tianjin_CN","Xinjiang_CN","Xizang_CN","Yunnan_CN","Zhejiang_CN"];
        var co_region=["Amazonas_CO","Antioquia_CO","Arauca_CO","Atlantico_CO","Bolivar_CO","Boyaca_CO","Caldas_CO","Caqueta_CO","Casanare_CO","Cauca_CO","Cesar_CO","Choco_CO","Cordoba_CO","Cundinamarca_CO","Distrito Capital de Bogota_CO","Guainia_CO","Guaviare_CO","Huila_CO","La Guajira_CO","Magdalena_CO","Meta_CO","Narino_CO","Norte de Santander_CO","Putumayo_CO","Quindio_CO","Risaralda_CO","San Andres, Providencia y Santa Catalina_CO","Santander_CO","Sucre_CO","Tolima_CO","Valle del Cauca_CO","Vaupes_CO","Vichada_CO"];
        var cr_region=["Alajuela_CR","Cartago_CR","Guanacaste_CR","Heredia_CR","Limon_CR","Puntarenas_CR","San Jose_CR"];
        var cu_region=["Artemisa_CU","Camaguey_CU","Ciego de Avila_CU","Cienfuegos_CU","Granma_CU","Guantanamo_CU","Holguin_CU","Isla de la Juventud_CU","La Habana_CU","Las Tunas_CU","Matanzas_CU","Mayabeque_CU","Pinar del Rio_CU","Sancti Spiritus_CU","Santiago de Cuba_CU","Villa Clara_CU"];
        var cv_region=["Boa Vista_CV","Brava_CV","Maio_CV","Mosteiros_CV","Paul_CV","Porto Novo_CV","Praia_CV","Ribeira Brava_CV","Ribeira Grande_CV","Ribeira Grande de Santiago_CV","Sal_CV","Santa Catarina_CV","Santa Catarina do Fogo_CV","Santa Cruz_CV","Sao Domingos_CV","Sao Filipe_CV","Sao Lourenco dos Orgaos_CV","Sao Miguel_CV","Sao Salvador do Mundo_CV","Sao Vicente_CV","Tarrafal_CV","Tarrafal de Sao Nicolau_CV"];
        var cw_region=["Curacao_CW"];
        var cx_region=["Christmas Island_CX"];
        var cy_region=["Ammochostos_CY","Keryneia_CY","Larnaka_CY","Lefkosia_CY","Lemesos_CY","Pafos_CY"];
        var cz_region=["Jihocesky kraj_CZ","Jihomoravsky kraj_CZ","Karlovarsky kraj_CZ","Kraj Vysocina_CZ","Kralovehradecky kraj_CZ","Liberecky kraj_CZ","Moravskoslezsky kraj_CZ","Olomoucky kraj_CZ","Pardubicky kraj_CZ","Plzensky kraj_CZ","Praha, Hlavni mesto_CZ","Stredocesky kraj_CZ","Ustecky kraj_CZ","Zlinsky kraj_CZ"];
        var de_region=["Baden-Wurttemberg_DE","Bayern_DE","Berlin_DE","Brandenburg_DE","Bremen_DE","Hamburg_DE","Hessen_DE","Mecklenburg-Vorpommern_DE","Niedersachsen_DE","Nordrhein-Westfalen_DE","Rheinland-Pfalz_DE","Saarland_DE","Sachsen_DE","Sachsen-Anhalt_DE","Schleswig-Holstein_DE","Thuringen_DE"];
        var dj_region=["Ali Sabieh_DJ","Arta_DJ","Dikhil_DJ","Djibouti_DJ","Obock_DJ","Tadjourah_DJ"];
        var dk_region=["Hovedstaden_DK","Midtjylland_DK","Nordjylland_DK","Sjaelland_DK","Syddanmark_DK"];
        var dm_region=["Saint Andrew_DM","Saint David_DM","Saint George_DM","Saint John_DM","Saint Joseph_DM","Saint Luke_DM","Saint Mark_DM","Saint Patrick_DM","Saint Paul_DM","Saint Peter_DM"];
        var do1_region=["Azua_DO","Baoruco_DO","Barahona_DO","Dajabon_DO","Distrito Nacional (Santo Domingo)_DO","Duarte_DO","El Seibo_DO","Elias Pina_DO","Espaillat_DO","Hato Mayor_DO","Hermanas Mirabal_DO","Independencia_DO","La Altagracia_DO","La Romana_DO","La Vega_DO","Maria Trinidad Sanchez_DO","Monsenor Nouel_DO","Monte Cristi_DO","Monte Plata_DO","Pedernales_DO","Peravia_DO","Puerto Plata_DO","Samana_DO","San Cristobal_DO","San Jose de Ocoa_DO","San Juan_DO","San Pedro de Macoris_DO","Sanchez Ramirez_DO","Santiago_DO","Santiago Rodriguez_DO","Valverde_DO"];
        var dz_region=["Adrar_DZ","Ain Defla_DZ","Ain Temouchent_DZ","Alger_DZ","Annaba_DZ","Batna_DZ","Bechar_DZ","Bejaia_DZ","Biskra_DZ","Blida_DZ","Bordj Bou Arreridj_DZ","Bouira_DZ","Boumerdes_DZ","Chlef_DZ","Constantine_DZ","Djelfa_DZ","El Bayadh_DZ","El Oued_DZ","El Tarf_DZ","Ghardaia_DZ","Guelma_DZ","Illizi_DZ","Jijel_DZ","Khenchela_DZ","Laghouat_DZ","M'sila_DZ","Mascara_DZ","Medea_DZ","Mila_DZ","Mostaganem_DZ","Naama_DZ","Oran_DZ","Ouargla_DZ","Oum el Bouaghi_DZ","Relizane_DZ","Saida_DZ","Setif_DZ","Sidi Bel Abbes_DZ","Skikda_DZ","Souk Ahras_DZ","Tamanrasset_DZ","Tebessa_DZ","Tiaret_DZ","Tindouf_DZ","Tipaza_DZ","Tissemsilt_DZ","Tizi Ouzou_DZ","Tlemcen_DZ"];
        var ec_region=["Azuay_EC","Bolivar_EC","Canar_EC","Carchi_EC","Chimborazo_EC","Cotopaxi_EC","El Oro_EC","Esmeraldas_EC","Galapagos_EC","Guayas_EC","Imbabura_EC","Loja_EC","Los Rios_EC","Manabi_EC","Morona Santiago_EC","Napo_EC","Orellana_EC","Pastaza_EC","Pichincha_EC","Santa Elena_EC","Santo Domingo de los Tsachilas_EC","Sucumbios_EC","Tungurahua_EC","Zamora Chinchipe_EC"];
        var ee_region=["Harjumaa_EE","Hiiumaa_EE","Ida-Virumaa_EE","Jarvamaa_EE","Jogevamaa_EE","Laane-Virumaa_EE","Laanemaa_EE","Parnumaa_EE","Polvamaa_EE","Raplamaa_EE","Saaremaa_EE","Tartumaa_EE","Valgamaa_EE","Viljandimaa_EE","Vorumaa_EE"];
        var eg_region=["Ad Daqahliyah_EG","Al Bahr al Ahmar_EG","Al Buhayrah_EG","Al Fayyum_EG","Al Gharbiyah_EG","Al Iskandariyah_EG","Al Isma'iliyah_EG","Al Jizah_EG","Al Minufiyah_EG","Al Minya_EG","Al Qahirah_EG","Al Qalyubiyah_EG","Al Uqsur_EG","Al Wadi al Jadid_EG","As Suways_EG","Ash Sharqiyah_EG","Aswan_EG","Asyut_EG","Bani Suwayf_EG","Bur Sa'id_EG","Dumyat_EG","Janub Sina'_EG","Kafr ash Shaykh_EG","Matruh_EG","Qina_EG","Shamal Sina'_EG","Suhaj_EG"];
        var eh_region=["Western Sahara_EH"];
        var er_region=["Al Awsat_ER","Al Janubi_ER","Ansaba_ER","Janubi al Bahri al Ahmar_ER","Qash-Barkah_ER","Shimali al Bahri al Ahmar_ER"];
        var es_region=["Andalucia_ES","Aragon_ES","Asturias, Principado de_ES","Canarias_ES","Cantabria_ES","Castilla y Leon_ES","Castilla-La Mancha_ES","Catalunya_ES","Ceuta_ES","Extremadura_ES","Galicia_ES","Illes Balears_ES","La Rioja_ES","Madrid, Comunidad de_ES","Melilla_ES","Murcia, Region de_ES","Navarra, Comunidad Foral de_ES","Pais Vasco_ES","Valenciana, Comunidad_ES"];
        var et_region=["Adis Abeba_ET","Afar_ET","Amara_ET","Binshangul Gumuz_ET","Dire Dawa_ET","Gambela Hizboch_ET","Hareri Hizb_ET","Oromiya_ET","Sumale_ET","Tigray_ET","YeDebub Biheroch Bihereseboch na Hizboch_ET"];
        var fi_region=["Etela-Karjala_FI","Etela-Pohjanmaa_FI","Etela-Savo_FI","Kainuu_FI","Kanta-Hame_FI","Keski-Pohjanmaa_FI","Keski-Suomi_FI","Kymenlaakso_FI","Lappi_FI","Paijat-Hame_FI","Pirkanmaa_FI","Pohjanmaa_FI","Pohjois-Karjala_FI","Pohjois-Pohjanmaa_FI","Pohjois-Savo_FI","Satakunta_FI","Uusimaa_FI","Varsinais-Suomi_FI"];
        var fj_region=["Central_FJ","Eastern_FJ","Northern_FJ","Rotuma_FJ","Western_FJ"];
        var fk_region=["Falkland Islands (Malvinas)_FK"];
        var fm_region=["Chuuk_FM","Kosrae_FM","Pohnpei_FM","Yap_FM"];
        var fo_region=["Eysturoy_FO","Nordoyar_FO","Sandoy_FO","Streymoy_FO","Suduroy_FO","Vagar_FO"];
        var fr_region=["Auvergne-Rhone-Alpes_FR","Bourgogne-Franche-Comte_FR","Bretagne_FR","Centre-Val de Loire_FR","Corse_FR","Grand-Est_FR","Hauts-de-France_FR","Ile-de-France_FR","Normandie_FR","Nouvelle-Aquitaine_FR","Occitanie_FR","Pays-de-la-Loire_FR","Provence-Alpes-Cote-d'Azur_FR"];
        var ga_region=["Estuaire_GA","Haut-Ogooue_GA","Moyen-Ogooue_GA","Ngounie_GA","Nyanga_GA","Ogooue-Ivindo_GA","Ogooue-Lolo_GA","Ogooue-Maritime_GA","Woleu-Ntem_GA"];
        var gb_region=["England_GB","Northern Ireland_GB","Scotland_GB","Wales_GB"];
        var gd_region=["Saint Andrew_GD","Saint David_GD","Saint George_GD","Saint John_GD","Saint Mark_GD","Saint Patrick_GD","Southern Grenadine Islands_GD"];
        var ge_region=["Abkhazia_GE","Ajaria_GE","Guria_GE","Imereti_GE","K'akheti_GE","Kvemo Kartli_GE","Mtskheta-Mtianeti_GE","Rach'a-Lechkhumi-Kvemo Svaneti_GE","Samegrelo-Zemo Svaneti_GE","Samtskhe-Javakheti_GE","Shida Kartli_GE","Tbilisi_GE"];
        var gf_region=["Guyane_GF"];
        var gg_region=["Guernsey_GG"];
        var gh_region=["Ashanti_GH","Brong-Ahafo_GH","Central_GH","Eastern_GH","Greater Accra_GH","Northern_GH","Upper East_GH","Upper West_GH","Volta_GH","Western_GH"];
        var gi_region=["Gibraltar_GI"];
        var gl_region=["Avannaata Kommunia_GL","Kommune Kujalleq_GL","Kommune Qeqertalik_GL","Kommuneqarfik Sermersooq_GL","Qeqqata Kommunia_GL"];
        var gm_region=["Banjul_GM","Central River_GM","Lower River_GM","North Bank_GM","Upper River_GM","Western_GM"];
        var gn_region=["Beyla_GN","Boffa_GN","Boke_GN","Conakry_GN","Coyah_GN","Dabola_GN","Dalaba_GN","Dinguiraye_GN","Dubreka_GN","Faranah_GN","Forecariah_GN","Fria_GN","Gaoual_GN","Guekedou_GN","Kankan_GN","Kerouane_GN","Kindia_GN","Kissidougou_GN","Koubia_GN","Koundara_GN","Kouroussa_GN","Labe_GN","Lelouma_GN","Lola_GN","Macenta_GN","Mali_GN","Mamou_GN","Mandiana_GN","Nzerekore_GN","Pita_GN","Siguiri_GN","Telimele_GN","Tougue_GN","Yomou_GN"];
        var gp_region=["Guadeloupe_GP"];
        var gq_region=["Annobon_GQ","Bioko Norte_GQ","Bioko Sur_GQ","Centro Sur_GQ","Kie-Ntem_GQ","Litoral_GQ","Wele-Nzas_GQ"];
        var gr_region=["Agion Oros_GR","Anatoliki Makedonia kai Thraki_GR","Attiki_GR","Dytiki Ellada_GR","Dytiki Makedonia_GR","Ionia Nisia_GR","Ipeiros_GR","Kentriki Makedonia_GR","Kriti_GR","Notio Aigaio_GR","Peloponnisos_GR","Sterea Ellada_GR","Thessalia_GR","Voreio Aigaio_GR"];
        var gs_region=["South Georgia and the South Sandwich Islands_GS"];
        var gt_region=["Alta Verapaz_GT","Baja Verapaz_GT","Chimaltenango_GT","Chiquimula_GT","El Progreso_GT","Escuintla_GT","Guatemala_GT","Huehuetenango_GT","Izabal_GT","Jalapa_GT","Jutiapa_GT","Peten_GT","Quetzaltenango_GT","Quiche_GT","Retalhuleu_GT","Sacatepequez_GT","San Marcos_GT","Santa Rosa_GT","Solola_GT","Suchitepequez_GT","Totonicapan_GT","Zacapa_GT"];
        var gu_region=["Agana Heights_GU","Agat_GU","Asan-Maina_GU","Barrigada_GU","Chalan Pago-Ordot_GU","Dededo_GU","Hagatna_GU","Inarajan_GU","Mangilao_GU","Merizo_GU","Mongmong-Toto-Maite_GU","Piti_GU","Santa Rita_GU","Sinajana_GU","Talofofo_GU","Tamuning-Tumon-Harmon_GU","Umatac_GU","Yigo_GU","Yona_GU"];
        var gw_region=["Bafata_GW","Biombo_GW","Bissau_GW","Bolama_GW","Cacheu_GW","Gabu_GW","Oio_GW","Quinara_GW","Tombali_GW"];
        var gy_region=["Barima-Waini_GY","Cuyuni-Mazaruni_GY","Demerara-Mahaica_GY","East Berbice-Corentyne_GY","Essequibo Islands-West Demerara_GY","Mahaica-Berbice_GY","Pomeroon-Supenaam_GY","Potaro-Siparuni_GY","Upper Demerara-Berbice_GY","Upper Takutu-Upper Essequibo_GY"];
        var hk_region=["Hong Kong_HK"];
        var hn_region=["Atlantida_HN","Choluteca_HN","Colon_HN","Comayagua_HN","Copan_HN","Cortes_HN","El Paraiso_HN","Francisco Morazan_HN","Gracias a Dios_HN","Intibuca_HN","Islas de la Bahia_HN","La Paz_HN","Lempira_HN","Ocotepeque_HN","Olancho_HN","Santa Barbara_HN","Valle_HN","Yoro_HN"];
        var hr_region=["Bjelovarsko-bilogorska zupanija_HR","Brodsko-posavska zupanija_HR","Dubrovacko-neretvanska zupanija_HR","Grad Zagreb_HR","Istarska zupanija_HR","Karlovacka zupanija_HR","Koprivnicko-krizevacka zupanija_HR","Krapinsko-zagorska zupanija_HR","Licko-senjska zupanija_HR","Medimurska zupanija_HR","Osjecko-baranjska zupanija_HR","Pozesko-slavonska zupanija_HR","Primorsko-goranska zupanija_HR","Sibensko-kninska zupanija_HR","Sisacko-moslavacka zupanija_HR","Splitsko-dalmatinska zupanija_HR","Varazdinska zupanija_HR","Viroviticko-podravska zupanija_HR","Vukovarsko-srijemska zupanija_HR","Zadarska zupanija_HR","Zagrebacka zupanija_HR"];
        var ht_region=["Artibonite_HT","Centre_HT","Grande'Anse_HT","Nippes_HT","Nord_HT","Nord-Est_HT","Nord-Ouest_HT","Ouest_HT","Sud_HT","Sud-Est_HT"];
        var hu_region=["Bacs-Kiskun_HU","Baranya_HU","Bekes_HU","Borsod-Abauj-Zemplen_HU","Budapest_HU","Csongrad_HU","Fejer_HU","Gyor-Moson-Sopron_HU","Hajdu-Bihar_HU","Heves_HU","Jasz-Nagykun-Szolnok_HU","Komarom-Esztergom_HU","Nograd_HU","Pest_HU","Somogy_HU","Szabolcs-Szatmar-Bereg_HU","Tolna_HU","Vas_HU","Veszprem_HU","Zala_HU"];
        var id_region=["Aceh_ID","Bali_ID","Banten_ID","Bengkulu_ID","Gorontalo_ID","Jakarta Raya_ID","Jambi_ID","Jawa Barat_ID","Jawa Tengah_ID","Jawa Timur_ID","Kalimantan Barat_ID","Kalimantan Selatan_ID","Kalimantan Tengah_ID","Kalimantan Timur_ID","Kalimantan Utara_ID","Kepulauan Bangka Belitung_ID","Kepulauan Riau_ID","Lampung_ID","Maluku_ID","Maluku Utara_ID","Nusa Tenggara Barat_ID","Nusa Tenggara Timur_ID","Papua_ID","Papua Barat_ID","Riau_ID","Sulawesi Barat_ID","Sulawesi Selatan_ID","Sulawesi Tengah_ID","Sulawesi Tenggara_ID","Sulawesi Utara_ID","Sumatera Barat_ID","Sumatera Selatan_ID","Sumatera Utara_ID","Yogyakarta_ID"];
        var ie_region=["Carlow_IE","Cavan_IE","Clare_IE","Cork_IE","Donegal_IE","Dublin_IE","Galway_IE","Kerry_IE","Kildare_IE","Kilkenny_IE","Laois_IE","Leitrim_IE","Limerick_IE","Longford_IE","Louth_IE","Mayo_IE","Meath_IE","Monaghan_IE","Offaly_IE","Roscommon_IE","Sligo_IE","Tipperary_IE","Waterford_IE","Westmeath_IE","Wexford_IE","Wicklow_IE"];
        var il_region=["HaDarom_IL","HaMerkaz_IL","HaTsafon_IL","Hefa_IL","Tel Aviv_IL","Yerushalayim_IL"];
        var im_region=["Isle of Man_IM"];
        var in1_region=["Andaman and Nicobar Islands_IN","Andhra Pradesh_IN","Arunachal Pradesh_IN","Assam_IN","Bihar_IN","Chandigarh_IN","Chhattisgarh_IN","Dadra and Nagar Haveli_IN","Daman and Diu_IN","Delhi_IN","Goa_IN","Gujarat_IN","Haryana_IN","Himachal Pradesh_IN","Jammu and Kashmir_IN","Jharkhand_IN","Karnataka_IN","Kerala_IN","Lakshadweep_IN","Madhya Pradesh_IN","Maharashtra_IN","Manipur_IN","Meghalaya_IN","Mizoram_IN","Nagaland_IN","Odisha_IN","Puducherry_IN","Punjab_IN","Rajasthan_IN","Sikkim_IN","Tamil Nadu_IN","Telangana_IN","Tripura_IN","Uttar Pradesh_IN","Uttarakhand_IN","West Bengal_IN"];
        var io_region=["British Indian Ocean Territory_IO"];
        var iq_region=["Al Anbar_IQ","Al Basrah_IQ","Al Muthanna_IQ","Al Qadisiyah_IQ","An Najaf_IQ","Arbil_IQ","As Sulaymaniyah_IQ","Babil_IQ","Baghdad_IQ","Dahuk_IQ","Dhi Qar_IQ","Diyala_IQ","Karbala'_IQ","Kirkuk_IQ","Maysan_IQ","Ninawa_IQ","Salah ad Din_IQ","Wasit_IQ"];
        var ir_region=["Alborz_IR","Ardabil_IR","Azarbayjan-e Gharbi_IR","Azarbayjan-e Sharqi_IR","Bushehr_IR","Chahar Mahal va Bakhtiari_IR","Esfahan_IR","Fars_IR","Gilan_IR","Golestan_IR","Hamadan_IR","Hormozgan_IR","Ilam_IR","Kerman_IR","Kermanshah_IR","Khorasan-e Jonubi_IR","Khorasan-e Razavi_IR","Khorasan-e Shomali_IR","Khuzestan_IR","Kohgiluyeh va Bowyer Ahmad_IR","Kordestan_IR","Lorestan_IR","Markazi_IR","Mazandaran_IR","Qazvin_IR","Qom_IR","Semnan_IR","Sistan va Baluchestan_IR","Tehran_IR","Yazd_IR","Zanjan_IR"];
        var is_region=["Austurland_IS","Hofudborgarsvaedi_IS","Nordurland eystra_IS","Nordurland vestra_IS","Sudurland_IS","Sudurnes_IS","Vestfirdir_IS","Vesturland_IS"];
        var it_region=["Abruzzo_IT","Basilicata_IT","Calabria_IT","Campania_IT","Emilia-Romagna_IT","Friuli-Venezia Giulia_IT","Lazio_IT","Liguria_IT","Lombardia_IT","Marche_IT","Molise_IT","Piemonte_IT","Puglia_IT","Sardegna_IT","Sicilia_IT","Toscana_IT","Trentino-Alto Adige_IT","Umbria_IT","Valle d'Aosta_IT","Veneto_IT"];
        var je_region=["Jersey_JE"];
        var jm_region=["Clarendon_JM","Hanover_JM","Kingston_JM","Manchester_JM","Portland_JM","Saint Andrew_JM","Saint Ann_JM","Saint Catherine_JM","Saint Elizabeth_JM","Saint James_JM","Saint Mary_JM","Saint Thomas_JM","Trelawny_JM","Westmoreland_JM"];
        var jo_region=["\'Ajlun_JO","Al 'Aqabah_JO","Al 'Asimah_JO","Al Balqa'_JO","Al Karak_JO","Al Mafraq_JO","At Tafilah_JO","Az Zarqa'_JO","Irbid_JO","Jarash_JO","Ma'an_JO","Madaba_JO"];
        var jp_region=["Aichi_JP","Akita_JP","Aomori_JP","Chiba_JP","Ehime_JP","Fukui_JP","Fukuoka_JP","Fukushima_JP","Gifu_JP","Gunma_JP","Hiroshima_JP","Hokkaido_JP","Hyogo_JP","Ibaraki_JP","Ishikawa_JP","Iwate_JP","Kagawa_JP","Kagoshima_JP","Kanagawa_JP","Kochi_JP","Kumamoto_JP","Kyoto_JP","Mie_JP","Miyagi_JP","Miyazaki_JP","Nagano_JP","Nagasaki_JP","Nara_JP","Niigata_JP","Oita_JP","Okayama_JP","Okinawa_JP","Osaka_JP","Saga_JP","Saitama_JP","Shiga_JP","Shimane_JP","Shizuoka_JP","Tochigi_JP","Tokushima_JP","Tokyo_JP","Tottori_JP","Toyama_JP","Wakayama_JP","Yamagata_JP","Yamaguchi_JP","Yamanashi_JP"];
        var ke_region=["Baringo_KE","Bomet_KE","Bungoma_KE","Busia_KE","Elgeyo/Marakwet_KE","Embu_KE","Garissa_KE","Homa Bay_KE","Isiolo_KE","Kajiado_KE","Kakamega_KE","Kericho_KE","Kiambu_KE","Kilifi_KE","Kirinyaga_KE","Kisii_KE","Kisumu_KE","Kitui_KE","Kwale_KE","Laikipia_KE","Lamu_KE","Machakos_KE","Makueni_KE","Mandera_KE","Marsabit_KE","Meru_KE","Migori_KE","Mombasa_KE","Murang'a_KE","Nairobi City_KE","Nakuru_KE","Nandi_KE","Narok_KE","Nyamira_KE","Nyandarua_KE","Nyeri_KE","Samburu_KE","Siaya_KE","Taita/Taveta_KE","Tana River_KE","Tharaka-Nithi_KE","Trans Nzoia_KE","Turkana_KE","Uasin Gishu_KE","Vihiga_KE","Wajir_KE","West Pokot_KE"];
        var kg_region=["Batken_KG","Bishkek_KG","Chuy_KG","Jalal-Abad_KG","Naryn_KG","Osh_KG","Talas_KG","Ysyk-Kol_KG"];
        var kh_region=["Baat Dambang_KH","Banteay Mean Chey_KH","Kampong Chaam_KH","Kampong Chhnang_KH","Kampong Spueu_KH","Kampong Thum_KH","Kampot_KH","Kandaal_KH","Kaoh Kong_KH","Kracheh_KH","Krong Kaeb_KH","Krong Pailin_KH","Krong Preah Sihanouk_KH","Mondol Kiri_KH","Otdar Mean Chey_KH","Phnom Penh_KH","Pousaat_KH","Preah Vihear_KH","Prey Veaeng_KH","Rotanak Kiri_KH","Siem Reab_KH","Stueng Traeng_KH","Svaay Rieng_KH","Taakaev_KH"];
        var ki_region=["Gilbert Islands_KI","Line Islands_KI"];
        var km_region=["Anjouan_KM","Grande Comore_KM","Moheli_KM"];
        var kn_region=["Christ Church Nichola Town_KN","Saint Anne Sandy Point_KN","Saint George Basseterre_KN","Saint George Gingerland_KN","Saint James Windward_KN","Saint John Capisterre_KN","Saint John Figtree_KN","Saint Mary Cayon_KN","Saint Paul Capisterre_KN","Saint Paul Charlestown_KN","Saint Peter Basseterre_KN","Saint Thomas Lowland_KN","Saint Thomas Middle Island_KN","Trinity Palmetto Point_KN"];
        var kp_region=["Chagang-do_KP","Hamgyong-bukto_KP","Hamgyong-namdo_KP","Hwanghae-bukto_KP","Hwanghae-namdo_KP","Kangwon-do_KP","P'yongan-bukto_KP","P'yongan-namdo_KP","P'yongyang_KP","Rason_KP","Ryanggang-do_KP"];
        var kr_region=["Busan-gwangyeoksi_KR","Chungcheongbuk-do_KR","Chungcheongnam-do_KR","Daegu-gwangyeoksi_KR","Daejeon-gwangyeoksi_KR","Gangwon-do_KR","Gwangju-gwangyeoksi_KR","Gyeonggi-do_KR","Gyeongsangbuk-do_KR","Gyeongsangnam-do_KR","Incheon-gwangyeoksi_KR","Jeju-teukbyeoljachido_KR","Jeollabuk-do_KR","Jeollanam-do_KR","Seoul-teukbyeolsi_KR","Ulsan-gwangyeoksi_KR"];
        var kw_region=["Al 'Asimah_KW","Al Ahmadi_KW","Al Farwaniyah_KW","Al Jahra'_KW","Hawalli_KW","Mubarak al Kabir_KW"];
        var ky_region=["Cayman Islands_KY"];
        var kz_region=["Almaty_KZ","Almaty oblysy_KZ","Aqmola oblysy_KZ","Aqtobe oblysy_KZ","Astana_KZ","Atyrau oblysy_KZ","Batys Qazaqstan oblysy_KZ","Bayqongyr_KZ","Mangghystau oblysy_KZ","Ongtustik Qazaqstan oblysy_KZ","Pavlodar oblysy_KZ","Qaraghandy oblysy_KZ","Qostanay oblysy_KZ","Qyzylorda oblysy_KZ","Shyghys Qazaqstan oblysy_KZ","Soltustik Qazaqstan oblysy_KZ","Zhambyl oblysy_KZ"];
        var la_region=["Attapu_LA","Bokeo_LA","Bolikhamxai_LA","Champasak_LA","Houaphan_LA","Khammouan_LA","Louang Namtha_LA","Louangphabang_LA","Oudomxai_LA","Phongsali_LA","Salavan_LA","Savannakhet_LA","Viangchan_LA","Xaignabouli_LA","Xekong_LA","Xiangkhouang_LA"];
        var lb_region=["Aakkar_LB","Baalbek-Hermel_LB","Beqaa_LB","Beyrouth_LB","Liban-Nord_LB","Liban-Sud_LB","Mont-Liban_LB","Nabatiye_LB"];
        var lc_region=["Anse la Raye_LC","Castries_LC","Choiseul_LC","Dennery_LC","Gros Islet_LC","Laborie_LC","Micoud_LC","Soufriere_LC","Vieux Fort_LC"];
        var li_region=["Balzers_LI","Eschen_LI","Gamprin_LI","Mauren_LI","Planken_LI","Ruggell_LI","Schaan_LI","Schellenberg_LI","Triesen_LI","Triesenberg_LI","Vaduz_LI"];
        var lk_region=["Central Province_LK","Eastern Province_LK","North Central Province_LK","North Western Province_LK","Northern Province_LK","Sabaragamuwa Province_LK","Southern Province_LK","Uva Province_LK","Western Province_LK"];
        var lr_region=["Bomi_LR","Bong_LR","Gbarpolu_LR","Grand Bassa_LR","Grand Cape Mount_LR","Grand Gedeh_LR","Grand Kru_LR","Lofa_LR","Margibi_LR","Maryland_LR","Montserrado_LR","Nimba_LR","River Cess_LR","River Gee_LR","Sinoe_LR"];
        var ls_region=["Berea_LS","Butha-Buthe_LS","Leribe_LS","Mafeteng_LS","Maseru_LS","Mohale's Hoek_LS","Mokhotlong_LS","Qacha's Nek_LS","Quthing_LS","Thaba-Tseka_LS"];
        var lt_region=["Alytaus apskritis_LT","Kauno apskritis_LT","Klaipedos apskritis_LT","Marijampoles apskritis_LT","Panevezio apskritis_LT","Siauliu apskritis_LT","Taurages apskritis_LT","Telsiu apskritis_LT","Utenos apskritis_LT","Vilniaus apskritis_LT"];
        var lu_region=["Diekirch_LU","Grevenmacher_LU","Luxembourg_LU"];
        var lv_region=["Adazu novads_LV","Aglonas novads_LV","Aizkraukles novads_LV","Aizputes novads_LV","Alojas novads_LV","Aluksnes novads_LV","Babites novads_LV","Baldones novads_LV","Baltinavas novads_LV","Balvu novads_LV","Bauskas novads_LV","Beverinas novads_LV","Brocenu novads_LV","Carnikavas novads_LV","Cesu novads_LV","Cesvaines novads_LV","Ciblas novads_LV","Daugavpils novads_LV","Dobeles novads_LV","Dundagas novads_LV","Erglu novads_LV","Gulbenes novads_LV","Iecavas novads_LV","Ikskiles novads_LV","Incukalna novads_LV","Jaunjelgavas novads_LV","Jaunpiebalgas novads_LV","Jaunpils novads_LV","Jekabpils novads_LV","Jelgava_LV","Jelgavas novads_LV","Jurmala_LV","Kekavas novads_LV","Kokneses novads_LV","Kraslavas novads_LV","Kuldigas novads_LV","Lielvardes novads_LV","Liepaja_LV","Limbazu novads_LV","Livanu novads_LV","Lubanas novads_LV","Ludzas novads_LV","Madonas novads_LV","Malpils novads_LV","Nauksenu novads_LV","Ogres novads_LV","Olaines novads_LV","Ozolnieku novads_LV","Preilu novads_LV","Rezeknes novads_LV","Riebinu novads_LV","Riga_LV","Rojas novads_LV","Ropazu novads_LV","Rugaju novads_LV","Rundales novads_LV","Salacgrivas novads_LV","Salaspils novads_LV","Saldus novads_LV","Saulkrastu novads_LV","Sejas novads_LV","Siguldas novads_LV","Skrundas novads_LV","Stopinu novads_LV","Strencu novads_LV","Talsu novads_LV","Tukuma novads_LV","Vainodes novads_LV","Valkas novads_LV","Valmiera_LV","Varkavas novads_LV","Vecumnieku novads_LV","Ventspils novads_LV"];
        var ly_region=["Al Butnan_LY","Al Jabal al Akhdar_LY","Al Jabal al Gharbi_LY","Al Jafarah_LY","Al Jufrah_LY","Al Kufrah_LY","Al Marj_LY","Al Marqab_LY","Al Wahat_LY","An Nuqat al Khams_LY","Az Zawiyah_LY","Banghazi_LY","Darnah_LY","Ghat_LY","Misratah_LY","Murzuq_LY","Nalut_LY","Sabha_LY","Surt_LY","Tarabulus_LY","Wadi al Hayat_LY","Wadi ash Shati'_LY"];
        var ma_region=["Beni-Mellal-Khenifra_MA","Casablanca-Settat_MA","Draa-Tafilalet_MA","Fes- Meknes_MA","Guelmim-Oued Noun (EH-partial)_MA","L'Oriental_MA","Laayoune-Sakia El Hamra (EH-partial)_MA","Marrakech-Safi_MA","Rabat-Sale-Kenitra_MA","Souss-Massa_MA","Tanger-Tetouan-Al Hoceima_MA"];
        var mc_region=["Fontvieille_MC","La Condamine_MC","Monaco-Ville_MC","Moneghetti_MC","Monte-Carlo_MC","Saint-Roman_MC"];
        var md_region=["Anenii Noi_MD","Balti_MD","Basarabeasca_MD","Bender_MD","Briceni_MD","Cahul_MD","Calarasi_MD","Cantemir_MD","Causeni_MD","Chisinau_MD","Cimislia_MD","Criuleni_MD","Donduseni_MD","Drochia_MD","Dubasari_MD","Edinet_MD","Falesti_MD","Floresti_MD","Gagauzia, Unitatea teritoriala autonoma_MD","Glodeni_MD","Hincesti_MD","Ialoveni_MD","Leova_MD","Nisporeni_MD","Ocnita_MD","Orhei_MD","Rezina_MD","Riscani_MD","Singerei_MD","Soldanesti_MD","Soroca_MD","Stefan Voda_MD","Stinga Nistrului, unitatea teritoriala din_MD","Straseni_MD","Taraclia_MD","Telenesti_MD","Ungheni_MD"];
        var me_region=["Andrijevica_ME","Bar_ME","Berane_ME","Bijelo Polje_ME","Budva_ME","Cetinje_ME","Danilovgrad_ME","Herceg-Novi_ME","Kolasin_ME","Kotor_ME","Mojkovac_ME","Niksic_ME","Plav_ME","Pljevlja_ME","Pluzine_ME","Podgorica_ME","Rozaje_ME","Savnik_ME","Tivat_ME","Ulcinj_ME","Zabljak_ME"];
        var mf_region=["Saint Martin (French Part)_MF"];
        var mg_region=["Antananarivo_MG","Antsiranana_MG","Fianarantsoa_MG","Mahajanga_MG","Toamasina_MG","Toliara_MG"];
        var mh_region=["Ailinglaplap_MH","Ailuk_MH","Arno_MH","Aur_MH","Bikini & Kili_MH","Ebon_MH","Enewetak & Ujelang_MH","Jabat_MH","Jaluit_MH","Kwajalein_MH","Lae_MH","Lib_MH","Likiep_MH","Majuro_MH","Maloelap_MH","Mejit_MH","Mili_MH","Namdrik_MH","Namu_MH","Rongelap_MH","Ujae_MH","Utrik_MH","Wotho_MH","Wotje_MH"];
        var mk_region=["Aracinovo_MK","Berovo_MK","Bitola_MK","Bogdanci_MK","Bogovinje_MK","Bosilovo_MK","Brvenica_MK","Caska_MK","Centar Zupa_MK","Cesinovo-Oblesevo_MK","Cucer Sandevo_MK","Debar_MK","Debarca_MK","Delcevo_MK","Demir Hisar_MK","Demir Kapija_MK","Dojran_MK","Dolneni_MK","Gevgelija_MK","Gostivar_MK","Gradsko_MK","Ilinden_MK","Jegunovce_MK","Karbinci_MK","Kavadarci_MK","Kicevo_MK","Kocani_MK","Konce_MK","Kratovo_MK","Kriva Palanka_MK","Krivogastani_MK","Krusevo_MK","Kumanovo_MK","Lipkovo_MK","Lozovo_MK","Makedonska Kamenica_MK","Makedonski Brod_MK","Mavrovo i Rostusa_MK","Mogila_MK","Negotino_MK","Novaci_MK","Novo Selo_MK","Ohrid_MK","Pehcevo_MK","Petrovec_MK","Plasnica_MK","Prilep_MK","Probistip_MK","Radovis_MK","Rankovce_MK","Resen_MK","Rosoman_MK","Skopje_MK","Sopiste_MK","Staro Nagoricane_MK","Stip_MK","Struga_MK","Strumica_MK","Studenicani_MK","Sveti Nikole_MK","Tearce_MK","Tetovo_MK","Valandovo_MK","Vasilevo_MK","Veles_MK","Vevcani_MK","Vinica_MK","Vrapciste_MK","Zelenikovo_MK","Zelino_MK","Zrnovci_MK"];
        var ml_region=["Bamako_ML","Gao_ML","Kayes_ML","Kidal_ML","Koulikoro_ML","Mopti_ML","Segou_ML","Sikasso_ML","Tombouctou_ML"];
        var mm_region=["Ayeyarwady_MM","Bago_MM","Chin_MM","Kachin_MM","Kayah_MM","Kayin_MM","Magway_MM","Mandalay_MM","Mon_MM","Nay Pyi Taw_MM","Rakhine_MM","Sagaing_MM","Shan_MM","Tanintharyi_MM","Yangon_MM"];
        var mn_region=["Arhangay_MN","Bayan-Olgiy_MN","Bayanhongor_MN","Bulgan_MN","Darhan uul_MN","Dornod_MN","Dornogovi_MN","Dundgovi_MN","Dzavhan_MN","Govi-Altay_MN","Govi-Sumber_MN","Hentiy_MN","Hovd_MN","Hovsgol_MN","Omnogovi_MN","Orhon_MN","Ovorhangay_MN","Selenge_MN","Suhbaatar_MN","Tov_MN","Ulaanbaatar_MN","Uvs_MN"];
        var mo_region=["Macao_MO"];
        var mp_region=["Northern Mariana Islands_MP"];
        var mq_region=["Martinique_MQ"];
        var mr_region=["Adrar_MR","Assaba_MR","Brakna_MR","Dakhlet Nouadhibou_MR","Gorgol_MR","Guidimaka_MR","Hodh ech Chargui_MR","Hodh el Gharbi_MR","Inchiri_MR","Nouakchott Nord_MR","Tagant_MR","Tiris Zemmour_MR","Trarza_MR"];
        var ms_region=["Saint Anthony_MS","Saint Peter_MS"];
        var mt_region=["Attard_MT","Balzan_MT","Birgu_MT","Birkirkara_MT","Birzebbuga_MT","Bormla_MT","Dingli_MT","Fgura_MT","Floriana_MT","Fontana_MT","Ghajnsielem_MT","Gharb_MT","Gharghur_MT","Ghasri_MT","Ghaxaq_MT","Gudja_MT","Gzira_MT","Hamrun_MT","Iklin_MT","Isla_MT","Kalkara_MT","Kercem_MT","Kirkop_MT","Lija_MT","Luqa_MT","Marsa_MT","Marsaskala_MT","Marsaxlokk_MT","Mdina_MT","Mellieha_MT","Mgarr_MT","Mosta_MT","Mqabba_MT","Msida_MT","Mtarfa_MT","Munxar_MT","Nadur_MT","Naxxar_MT","Paola_MT","Pembroke_MT","Pieta_MT","Qala_MT","Qormi_MT","Qrendi_MT","Rabat Gozo_MT","Rabat Malta_MT","Safi_MT","Saint John_MT","Saint Julian's_MT","Saint Lucia's_MT","Saint Paul's Bay_MT","Sannat_MT","Santa Venera_MT","Siggiewi_MT","Sliema_MT","Swieqi_MT","Ta' Xbiex_MT","Tarxien_MT","Valletta_MT","Xaghra_MT","Xewkija_MT","Xghajra_MT","Zabbar_MT","Zebbug Gozo_MT","Zejtun_MT","Zurrieq_MT"];
        var mu_region=["Agalega Islands_MU","Black River_MU","Flacq_MU","Grand Port_MU","Moka_MU","Pamplemousses_MU","Plaines Wilhems_MU","Port Louis_MU","Riviere du Rempart_MU","Rodrigues Islands_MU","Savanne_MU"];
        var mv_region=["Alifu Alifu_MV","Baa_MV","Dhaalu_MV","Gaafu Dhaalu_MV","Gnaviyani_MV","Haa Alifu_MV","Haa Dhaalu_MV","Kaafu_MV","Laamu_MV","Maale_MV","Meemu_MV","Noonu_MV","Raa_MV","Seenu_MV","Shaviyani_MV","Thaa_MV","Vaavu_MV"];
        var mw_region=["Balaka_MW","Blantyre_MW","Chikwawa_MW","Chiradzulu_MW","Chitipa_MW","Dedza_MW","Dowa_MW","Karonga_MW","Kasungu_MW","Likoma_MW","Lilongwe_MW","Machinga_MW","Mangochi_MW","Mchinji_MW","Mulanje_MW","Mwanza_MW","Mzimba_MW","Neno_MW","Nkhata Bay_MW","Nkhotakota_MW","Nsanje_MW","Ntcheu_MW","Ntchisi_MW","Phalombe_MW","Rumphi_MW","Salima_MW","Thyolo_MW","Zomba_MW"];
        var mx_region=["Aguascalientes_MX","Baja California_MX","Baja California Sur_MX","Campeche_MX","Chiapas_MX","Chihuahua_MX","Ciudad de Mexico_MX","Coahuila de Zaragoza_MX","Colima_MX","Durango_MX","Guanajuato_MX","Guerrero_MX","Hidalgo_MX","Jalisco_MX","Mexico_MX","Michoacan de Ocampo_MX","Morelos_MX","Nayarit_MX","Nuevo Leon_MX","Oaxaca_MX","Puebla_MX","Queretaro_MX","Quintana Roo_MX","San Luis Potosi_MX","Sinaloa_MX","Sonora_MX","Tabasco_MX","Tamaulipas_MX","Tlaxcala_MX","Veracruz de Ignacio de la Llave_MX","Yucatan_MX","Zacatecas_MX"];
        var my_region=["Johor_MY","Kedah_MY","Kelantan_MY","Melaka_MY","Negeri Sembilan_MY","Pahang_MY","Perak_MY","Perlis_MY","Pulau Pinang_MY","Sabah_MY","Sarawak_MY","Selangor_MY","Terengganu_MY","Wilayah Persekutuan Kuala Lumpur_MY","Wilayah Persekutuan Labuan_MY","Wilayah Persekutuan Putrajaya_MY"];
        var mz_region=["Cabo Delgado_MZ","Gaza_MZ","Inhambane_MZ","Manica_MZ","Maputo_MZ","Nampula_MZ","Niassa_MZ","Sofala_MZ","Tete_MZ","Zambezia_MZ"];
        var na_region=["Erongo_NA","Hardap_NA","Karas_NA","Kavango East_NA","Khomas_NA","Kunene_NA","Ohangwena_NA","Omaheke_NA","Omusati_NA","Oshana_NA","Oshikoto_NA","Otjozondjupa_NA","Zambezi_NA"];
        var nc_region=["Province des iles Loyaute_NC","Province Nord_NC","Province Sud_NC"];
        var ne_region=["Agadez_NE","Diffa_NE","Dosso_NE","Maradi_NE","Niamey_NE","Tahoua_NE","Tillaberi_NE","Zinder_NE"];
        var nf_region=["Norfolk Island_NF"];
        var ng_region=["Abia_NG","Abuja Federal Capital Territory_NG","Adamawa_NG","Akwa Ibom_NG","Anambra_NG","Bauchi_NG","Bayelsa_NG","Benue_NG","Borno_NG","Cross River_NG","Delta_NG","Ebonyi_NG","Edo_NG","Ekiti_NG","Enugu_NG","Gombe_NG","Imo_NG","Jigawa_NG","Kaduna_NG","Kano_NG","Katsina_NG","Kebbi_NG","Kogi_NG","Kwara_NG","Lagos_NG","Nasarawa_NG","Niger_NG","Ogun_NG","Ondo_NG","Osun_NG","Oyo_NG","Plateau_NG","Rivers_NG","Sokoto_NG","Taraba_NG","Yobe_NG","Zamfara_NG"];
        var ni_region=["Boaco_NI","Carazo_NI","Chinandega_NI","Chontales_NI","Costa Caribe Norte_NI","Costa Caribe Sur_NI","Esteli_NI","Granada_NI","Jinotega_NI","Leon_NI","Madriz_NI","Managua_NI","Masaya_NI","Matagalpa_NI","Nueva Segovia_NI","Rio San Juan_NI","Rivas_NI"];
        var nl_region=["Drenthe_NL","Flevoland_NL","Fryslan_NL","Gelderland_NL","Groningen_NL","Limburg_NL","Noord-Brabant_NL","Noord-Holland_NL","Overijssel_NL","Utrecht_NL","Zeeland_NL","Zuid-Holland_NL"];
        var no_region=["Akershus_NO","Aust-Agder_NO","Buskerud_NO","Finnmark_NO","Hedmark_NO","Hordaland_NO","More og Romsdal_NO","Nord-Trondelag_NO","Nordland_NO","Oppland_NO","Oslo_NO","Ostfold_NO","Rogaland_NO","Sogn og Fjordane_NO","Sor-Trondelag_NO","Telemark_NO","Troms_NO","Vest-Agder_NO","Vestfold_NO"];
        var np_region=["Bagmati_NP","Bheri_NP","Dhawalagiri_NP","Gandaki_NP","Janakpur_NP","Karnali_NP","Kosi_NP","Lumbini_NP","Mahakali_NP","Mechi_NP","Narayani_NP","Rapti_NP","Sagarmatha_NP","Seti_NP"];
        var nr_region=["Aiwo_NR","Anabar_NR","Anetan_NR","Anibare_NR","Baitsi_NR","Buada_NR","Ewa_NR","Ijuw_NR","Uaboe_NR","Yaren_NR"];
        var nu_region=["Niue_NU"];
        var nz_region=["Auckland_NZ","Bay of Plenty_NZ","Canterbury_NZ","Chatham Islands Territory_NZ","Gisborne_NZ","Hawke's Bay_NZ","Manawatu-Wanganui_NZ","Marlborough_NZ","Nelson_NZ","Northland_NZ","Otago_NZ","Southland_NZ","Taranaki_NZ","Tasman_NZ","Waikato_NZ","Wellington_NZ","West Coast_NZ"];
        var om_region=["Ad Dakhiliyah_OM","Al Buraymi_OM","Al Wusta_OM","Az Zahirah_OM","Janub al Batinah_OM","Janub ash Sharqiyah_OM","Masqat_OM","Musandam_OM","Shamal al Batinah_OM","Shamal ash Sharqiyah_OM","Zufar_OM"];
        var pa_region=["Bocas del Toro_PA","Chiriqui_PA","Cocle_PA","Colon_PA","Darien_PA","Embera_PA","Guna Yala_PA","Herrera_PA","Los Santos_PA","Ngobe-Bugle_PA","Panama_PA","Veraguas_PA"];
        var pe_region=["Amazonas_PE","Ancash_PE","Apurimac_PE","Arequipa_PE","Ayacucho_PE","Cajamarca_PE","Cusco_PE","El Callao_PE","Huancavelica_PE","Huanuco_PE","Ica_PE","Junin_PE","La Libertad_PE","Lambayeque_PE","Lima_PE","Loreto_PE","Madre de Dios_PE","Moquegua_PE","Pasco_PE","Piura_PE","Puno_PE","San Martin_PE","Tacna_PE","Tumbes_PE","Ucayali_PE"];
        var pf_region=["Iles Australes_PF","Iles du Vent_PF","Iles Marquises_PF","Iles Sous-le-Vent_PF","Iles Tuamotu-Gambier_PF"];
        var pg_region=["Bougainville_PG","Central_PG","Chimbu_PG","East New Britain_PG","East Sepik_PG","Eastern Highlands_PG","Enga_PG","Gulf_PG","Madang_PG","Manus_PG","Milne Bay_PG","Morobe_PG","National Capital District (Port Moresby)_PG","New Ireland_PG","Northern_PG","Southern Highlands_PG","West New Britain_PG","West Sepik_PG","Western_PG","Western Highlands_PG"];
        var ph_region=["Abra_PH","Agusan del Norte_PH","Agusan del Sur_PH","Aklan_PH","Albay_PH","Antique_PH","Apayao_PH","Aurora_PH","Basilan_PH","Bataan_PH","Batanes_PH","Batangas_PH","Benguet_PH","Biliran_PH","Bohol_PH","Bukidnon_PH","Bulacan_PH","Cagayan_PH","Camarines Norte_PH","Camarines Sur_PH","Camiguin_PH","Capiz_PH","Catanduanes_PH","Cavite_PH","Cebu_PH","Compostela Valley_PH","Cotabato_PH","Davao del Norte_PH","Davao del Sur_PH","Davao Oriental_PH","Dinagat Islands_PH","Eastern Samar_PH","Guimaras_PH","Ifugao_PH","Ilocos Norte_PH","Ilocos Sur_PH","Iloilo_PH","Isabela_PH","Kalinga_PH","La Union_PH","Laguna_PH","Lanao del Norte_PH","Lanao del Sur_PH","Leyte_PH","Maguindanao_PH","Marinduque_PH","Masbate_PH","Mindoro Occidental_PH","Mindoro Oriental_PH","Misamis Occidental_PH","Misamis Oriental_PH","Mountain Province_PH","National Capital Region_PH","Negros Occidental_PH","Negros Oriental_PH","Northern Samar_PH","Nueva Ecija_PH","Nueva Vizcaya_PH","Palawan_PH","Pampanga_PH","Pangasinan_PH","Quezon_PH","Quirino_PH","Rizal_PH","Romblon_PH","Samar_PH","Sarangani_PH","Siquijor_PH","Sorsogon_PH","South Cotabato_PH","Southern Leyte_PH","Sultan Kudarat_PH","Sulu_PH","Surigao del Norte_PH","Surigao del Sur_PH","Tarlac_PH","Tawi-Tawi_PH","Zambales_PH","Zamboanga del Norte_PH","Zamboanga del Sur_PH","Zamboanga Sibugay_PH"];
        var pk_region=["Azad Jammu and Kashmir_PK","Balochistan_PK","Federally Administered Tribal Areas_PK","Gilgit-Baltistan_PK","Islamabad_PK","Khyber Pakhtunkhwa_PK","Punjab_PK","Sindh_PK"];
        var pl_region=["Dolnoslaskie_PL","Kujawsko-pomorskie_PL","Lodzkie_PL","Lubelskie_PL","Lubuskie_PL","Malopolskie_PL","Mazowieckie_PL","Opolskie_PL","Podkarpackie_PL","Podlaskie_PL","Pomorskie_PL","Slaskie_PL","Swietokrzyskie_PL","Warminsko-mazurskie_PL","Wielkopolskie_PL","Zachodniopomorskie_PL"];
        var pm_region=["Saint Pierre and Miquelon_PM"];
        var pn_region=["Pitcairn_PN"];
        var pr_region=["Adjuntas_PR","Aguada_PR","Aguadilla_PR","Aguas Buenas_PR","Aibonito_PR","Anasco_PR","Arecibo_PR","Arroyo_PR","Barceloneta_PR","Barranquitas_PR","Bayamon_PR","Cabo Rojo_PR","Caguas_PR","Camuy_PR","Canovanas_PR","Carolina_PR","Catano_PR","Cayey_PR","Ceiba_PR","Ciales_PR","Cidra_PR","Coamo_PR","Comerio_PR","Corozal_PR","Culebra_PR","Dorado_PR","Fajardo_PR","Florida_PR","Guanica_PR","Guayama_PR","Guayanilla_PR","Guaynabo_PR","Gurabo_PR","Hatillo_PR","Hormigueros_PR","Humacao_PR","Isabela_PR","Juana Diaz_PR","Lajas_PR","Lares_PR","Las Marias_PR","Las Piedras_PR","Loiza_PR","Luquillo_PR","Manati_PR","Maricao_PR","Maunabo_PR","Mayaguez_PR","Moca_PR","Morovis_PR","Municipio de Jayuya_PR","Municipio de Juncos_PR","Naguabo_PR","Naranjito_PR","Patillas_PR","Penuelas_PR","Ponce_PR","Quebradillas_PR","Rincon_PR","Rio Grande_PR","Sabana Grande_PR","Salinas_PR","San German_PR","San Juan_PR","San Lorenzo_PR","San Sebastian_PR","Santa Isabel Municipio_PR","Toa Alta_PR","Toa Baja_PR","Trujillo Alto_PR","Utuado_PR","Vega Alta_PR","Vega Baja_PR","Vieques_PR","Villalba_PR","Yabucoa_PR","Yauco_PR"];
        var ps_region=["Bethlehem_PS","Gaza_PS","Hebron_PS","Jenin_PS","Jericho and Al Aghwar_PS","Jerusalem_PS","Nablus_PS","Qalqilya_PS","Ramallah_PS","Salfit_PS","Tubas_PS","Tulkarm_PS"];
        var pt_region=["Aveiro_PT","Beja_PT","Braga_PT","Braganca_PT","Castelo Branco_PT","Coimbra_PT","Evora_PT","Faro_PT","Guarda_PT","Leiria_PT","Lisboa_PT","Portalegre_PT","Porto_PT","Regiao Autonoma da Madeira_PT","Regiao Autonoma dos Acores_PT","Santarem_PT","Setubal_PT","Viana do Castelo_PT","Vila Real_PT","Viseu_PT"];
        var pw_region=["Aimeliik_PW","Airai_PW","Angaur_PW","Hatohobei_PW","Kayangel_PW","Koror_PW","Melekeok_PW","Ngaraard_PW","Ngarchelong_PW","Ngardmau_PW","Ngatpang_PW","Ngchesar_PW","Ngeremlengui_PW","Ngiwal_PW","Peleliu_PW","Sonsorol_PW"];
        var py_region=["Alto Paraguay_PY","Alto Parana_PY","Amambay_PY","Asuncion_PY","Boqueron_PY","Caaguazu_PY","Caazapa_PY","Canindeyu_PY","Central_PY","Concepcion_PY","Cordillera_PY","Guaira_PY","Itapua_PY","Misiones_PY","Neembucu_PY","Paraguari_PY","Presidente Hayes_PY","San Pedro_PY"];
        var qa_region=["Ad Dawhah_QA","Al Khawr wa adh Dhakhirah_QA","Al Wakrah_QA","Ar Rayyan_QA","Ash Shamal_QA","Az Za'ayin_QA","Umm Salal_QA"];
        var re_region=["Reunion_RE"];
        var ro_region=["Alba_RO","Arad_RO","Arges_RO","Bacau_RO","Bihor_RO","Bistrita-Nasaud_RO","Botosani_RO","Braila_RO","Brasov_RO","Bucuresti_RO","Buzau_RO","Calarasi_RO","Caras-Severin_RO","Cluj_RO","Constanta_RO","Covasna_RO","Dambovita_RO","Dolj_RO","Galati_RO","Giurgiu_RO","Gorj_RO","Harghita_RO","Hunedoara_RO","Ialomita_RO","Iasi_RO","Ilfov_RO","Maramures_RO","Mehedinti_RO","Mures_RO","Neamt_RO","Olt_RO","Prahova_RO","Salaj_RO","Satu Mare_RO","Sibiu_RO","Suceava_RO","Teleorman_RO","Timis_RO","Tulcea_RO","Valcea_RO","Vaslui_RO","Vrancea_RO"];
        var rs_region=["Beograd_RS","Borski okrug_RS","Branicevski okrug_RS","Jablanicki okrug_RS","Juznobacki okrug_RS","Juznobanatski okrug_RS","Kolubarski okrug_RS","Kosovsko-Mitrovacki okrug_RS","Macvanski okrug_RS","Moravicki okrug_RS","Nisavski okrug_RS","Pcinjski okrug_RS","Pecki okrug_RS","Pirotski okrug_RS","Podunavski okrug_RS","Pomoravski okrug_RS","Prizrenski okrug_RS","Rasinski okrug_RS","Raski okrug_RS","Severnobacki okrug_RS","Severnobanatski okrug_RS","Srednjebanatski okrug_RS","Sremski okrug_RS","Sumadijski okrug_RS","Toplicki okrug_RS","Zajecarski okrug_RS","Zapadnobacki okrug_RS","Zlatiborski okrug_RS"];
        var ru_region=["Adygeya, Respublika_RU","Altay, Respublika_RU","Altayskiy kray_RU","Amurskaya oblast'_RU","Arkhangel'skaya oblast'_RU","Astrakhanskaya oblast'_RU","Bashkortostan, Respublika_RU","Belgorodskaya oblast'_RU","Bryanskaya oblast'_RU","Buryatiya, Respublika_RU","Chechenskaya Respublika_RU","Chelyabinskaya oblast'_RU","Chukotskiy avtonomnyy okrug_RU","Chuvashskaya Respublika_RU","Dagestan, Respublika_RU","Ingushetiya, Respublika_RU","Irkutskaya oblast'_RU","Ivanovskaya oblast'_RU","Kabardino-Balkarskaya Respublika_RU","Kaliningradskaya oblast'_RU","Kalmykiya, Respublika_RU","Kaluzhskaya oblast'_RU","Kamchatskiy kray_RU","Karachayevo-Cherkesskaya Respublika_RU","Kareliya, Respublika_RU","Kemerovskaya oblast'_RU","Khabarovskiy kray_RU","Khakasiya, Respublika_RU","Khanty-Mansiyskiy avtonomnyy okrug_RU","Kirovskaya oblast'_RU","Komi, Respublika_RU","Kostromskaya oblast'_RU","Krasnodarskiy kray_RU","Krasnoyarskiy kray_RU","Kurganskaya oblast'_RU","Kurskaya oblast'_RU","Leningradskaya oblast'_RU","Lipetskaya oblast'_RU","Magadanskaya oblast'_RU","Mariy El, Respublika_RU","Mordoviya, Respublika_RU","Moskovskaya oblast'_RU","Moskva_RU","Murmanskaya oblast'_RU","Nenetskiy avtonomnyy okrug_RU","Nizhegorodskaya oblast'_RU","Novgorodskaya oblast'_RU","Novosibirskaya oblast'_RU","Omskaya oblast'_RU","Orenburgskaya oblast'_RU","Orlovskaya oblast'_RU","Penzenskaya oblast'_RU","Permskiy kray_RU","Primorskiy kray_RU","Pskovskaya oblast'_RU","Rostovskaya oblast'_RU","Ryazanskaya oblast'_RU","Saha, Respublika_RU","Sakhalinskaya oblast'_RU","Samarskaya oblast'_RU","Sankt-Peterburg_RU","Saratovskaya oblast'_RU","Severnaya Osetiya, Respublika_RU","Smolenskaya oblast'_RU","Stavropol'skiy kray_RU","Sverdlovskaya oblast'_RU","Tambovskaya oblast'_RU","Tatarstan, Respublika_RU","Tomskaya oblast'_RU","Tul'skaya oblast'_RU","Tverskaya oblast'_RU","Tyumenskaya oblast'_RU","Tyva, Respublika_RU","Udmurtskaya Respublika_RU","Ul'yanovskaya oblast'_RU","Vladimirskaya oblast'_RU","Volgogradskaya oblast'_RU","Vologodskaya oblast'_RU","Voronezhskaya oblast'_RU","Yamalo-Nenetskiy avtonomnyy okrug_RU","Yaroslavskaya oblast'_RU","Yevreyskaya avtonomnaya oblast'_RU","Zabaykal'skiy kray_RU"];
        var rw_region=["Est_RW","Nord_RW","Ouest_RW","Sud_RW","Ville de Kigali_RW"];
        var sa_region=["\'Asir_SA","Al Bahah_SA","Al Hudud ash Shamaliyah_SA","Al Jawf_SA","Al Madinah al Munawwarah_SA","Al Qasim_SA","Ar Riyad_SA","Ash Sharqiyah_SA","Ha'il_SA","Jazan_SA","Makkah al Mukarramah_SA","Najran_SA","Tabuk_SA"];
        var sb_region=["Central_SB","Choiseul_SB","Guadalcanal_SB","Isabel_SB","Makira-Ulawa_SB","Malaita_SB","Rennell and Bellona_SB","Temotu_SB","Western_SB"];
        var sc_region=["Anse aux Pins_SC","Anse Boileau_SC","Anse Royale_SC","Baie Lazare_SC","Beau Vallon_SC","Bel Ombre_SC","Cascade_SC","English River_SC","Grand Anse Mahe_SC","La Digue_SC","Pointe Larue_SC","Port Glaud_SC","Takamaka_SC"];
        var sd_region=["Blue Nile_SD","Gedaref_SD","Gezira_SD","Kassala_SD","Khartoum_SD","North Darfur_SD","North Kordofan_SD","Northern_SD","Red Sea_SD","River Nile_SD","Sennar_SD","South Darfur_SD","South Kordofan_SD","West Darfur_SD","White Nile_SD"];
        var se_region=["Blekinge lan_SE","Dalarnas lan_SE","Gavleborgs lan_SE","Gotlands lan_SE","Hallands lan_SE","Jamtlands lan_SE","Jonkopings lan_SE","Kalmar lan_SE","Kronobergs lan_SE","Norrbottens lan_SE","Orebro lan_SE","Ostergotlands lan_SE","Skane lan_SE","Sodermanlands lan_SE","Stockholms lan_SE","Uppsala lan_SE","Varmlands lan_SE","Vasterbottens lan_SE","Vasternorrlands lan_SE","Vastmanlands lan_SE","Vastra Gotalands lan_SE"];
        var sg_region=["Singapore_SG"];
        var sh_region=["Ascension_SH","Saint Helena_SH","Tristan da Cunha_SH"];
        var si_region=["Ajdovscina_SI","Apace_SI","Beltinci_SI","Benedikt_SI","Bistrica ob Sotli_SI","Bled_SI","Bloke_SI","Bohinj_SI","Borovnica_SI","Bovec_SI","Braslovce_SI","Brda_SI","Brezice_SI","Brezovica_SI","Cankova_SI","Celje_SI","Cerklje na Gorenjskem_SI","Cerknica_SI","Cerkno_SI","Cirkulane_SI","Crensovci_SI","Crnomelj_SI","Destrnik_SI","Divaca_SI","Dobje_SI","Dobrepolje_SI","Dobrna_SI","Dobrova-Polhov Gradec_SI","Dobrovnik_SI","Domzale_SI","Dornava_SI","Dravograd_SI","Duplek_SI","Gorje_SI","Gornja Radgona_SI","Gornji Petrovci_SI","Grad_SI","Grosuplje_SI","Hajdina_SI","Hoce-Slivnica_SI","Hodos_SI","Horjul_SI","Hrastnik_SI","Hrpelje-Kozina_SI","Idrija_SI","Ig_SI","Ilirska Bistrica_SI","Ivancna Gorica_SI","Izola_SI","Jesenice_SI","Jursinci_SI","Kamnik_SI","Kanal_SI","Kidricevo_SI","Kobarid_SI","Kobilje_SI","Kocevje_SI","Komen_SI","Komenda_SI","Koper_SI","Kosanjevica na Krki_SI","Kostel_SI","Kranj_SI","Kranjska Gora_SI","Krizevci_SI","Krsko_SI","Kungota_SI","Kuzma_SI","Lasko_SI","Lenart_SI","Lendava_SI","Litija_SI","Ljubljana_SI","Ljutomer_SI","Log-Dragomer_SI","Logatec_SI","Loska Dolina_SI","Loski Potok_SI","Lovrenc na Pohorju_SI","Luce_SI","Lukovica_SI","Majsperk_SI","Makole_SI","Maribor_SI","Markovci_SI","Medvode_SI","Menges_SI","Metlika_SI","Mezica_SI","Miklavz na Dravskem Polju_SI","Miren-Kostanjevica_SI","Mirna Pec_SI","Mislinja_SI","Mokronog-Trebelno_SI","Moravce_SI","Mozirje_SI","Murska Sobota_SI","Muta_SI","Naklo_SI","Nazarje_SI","Nova Gorica_SI","Novo Mesto_SI","Odranci_SI","Oplotnica_SI","Ormoz_SI","Piran_SI","Pivka_SI","Podcetrtek_SI","Podlehnik_SI","Poljcane_SI","Polzela_SI","Postojna_SI","Prebold_SI","Preddvor_SI","Prevalje_SI","Ptuj_SI","Puconci_SI","Race-Fram_SI","Radece_SI","Radenci_SI","Radlje ob Dravi_SI","Radovljica_SI","Ravne na Koroskem_SI","Razkrizje_SI","Recica ob Savinji_SI","Rence-Vogrsko_SI","Ribnica_SI","Rogaska Slatina_SI","Rogasovci_SI","Ruse_SI","Salovci_SI","Semic_SI","Sempeter-Vrtojba_SI","Sencur_SI","Sentilj_SI","Sentjernej_SI","Sentjur_SI","Sentrupert_SI","Sevnica_SI","Sezana_SI","Skocjan_SI","Skofja Loka_SI","Skofljica_SI","Slovenj Gradec_SI","Slovenska Bistrica_SI","Slovenske Konjice_SI","Smarje pri Jelsah_SI","Smarjeske Toplice_SI","Smartno ob Paki_SI","Smartno pri Litiji_SI","Sodrazica_SI","Solcava_SI","Sostanj_SI","Starse_SI","Store_SI","Straza_SI","Sveta Trojica v Slovenskih Goricah_SI","Sveti Andraz v Slovenskih Goricah_SI","Sveti Jurij_SI","Sveti Jurij v Slovenskih Goricah_SI","Sveti Tomaz_SI","Tabor_SI","Tisina_SI","Tolmin_SI","Trbovlje_SI","Trebnje_SI","Trnovska Vas_SI","Trzic_SI","Trzin_SI","Turnisce_SI","Velenje_SI","Velika Polana_SI","Velike Lasce_SI","Verzej_SI","Videm_SI","Vipava_SI","Vitanje_SI","Vodice_SI","Vojnik_SI","Vransko_SI","Vrhnika_SI","Vuzenica_SI","Zagorje ob Savi_SI","Zalec_SI","Zavrc_SI","Zelezniki_SI","Zetale_SI","Ziri_SI","Zrece_SI","Zuzemberk_SI"];
        var sj_region=["Svalbard and Jan Mayen_SJ"];
        var sk_region=["Banskobystricky kraj_SK","Bratislavsky kraj_SK","Kosicky kraj_SK","Nitriansky kraj_SK","Presovsky kraj_SK","Trenciansky kraj_SK","Trnavsky kraj_SK","Zilinsky kraj_SK"];
        var sl_region=["Eastern_SL","Northern_SL","Southern_SL","Western Area_SL"];
        var sm_region=["Acquaviva_SM","Borgo Maggiore_SM","Chiesanuova_SM","Domagnano_SM","Faetano_SM","Fiorentino_SM","Montegiardino_SM","San Marino_SM","Serravalle_SM"];
        var sn_region=["Dakar_SN","Diourbel_SN","Fatick_SN","Kaffrine_SN","Kaolack_SN","Kedougou_SN","Kolda_SN","Louga_SN","Matam_SN","Saint-Louis_SN","Sedhiou_SN","Tambacounda_SN","Thies_SN","Ziguinchor_SN"];
        var so_region=["Awdal_SO","Bakool_SO","Banaadir_SO","Bari_SO","Bay_SO","Galguduud_SO","Gedo_SO","Hiiraan_SO","Jubbada Dhexe_SO","Jubbada Hoose_SO","Mudug_SO","Nugaal_SO","Sanaag_SO","Shabeellaha Dhexe_SO","Shabeellaha Hoose_SO","Sool_SO","Togdheer_SO","Woqooyi Galbeed_SO"];
        var sr_region=["Brokopondo_SR","Commewijne_SR","Coronie_SR","Marowijne_SR","Nickerie_SR","Para_SR","Paramaribo_SR","Saramacca_SR","Sipaliwini_SR","Wanica_SR"];
        var ss_region=["Central Equatoria_SS","Eastern Equatoria_SS","Jonglei_SS","Lakes_SS","Northern Bahr el Ghazal_SS","Unity_SS","Upper Nile_SS","Warrap_SS","Western Bahr el Ghazal_SS","Western Equatoria_SS"];
        var st_region=["Principe_ST","Sao Tome_ST"];
        var sv_region=["Ahuachapan_SV","Cabanas_SV","Chalatenango_SV","Cuscatlan_SV","La Libertad_SV","La Paz_SV","La Union_SV","Morazan_SV","San Miguel_SV","San Salvador_SV","San Vicente_SV","Santa Ana_SV","Sonsonate_SV","Usulutan_SV"];
        var sx_region=["Sint Maarten (Dutch Part)_SX"];
        var sy_region=["Al Hasakah_SY","Al Ladhiqiyah_SY","Al Qunaytirah_SY","Ar Raqqah_SY","As Suwayda'_SY","Dar'a_SY","Dayr az Zawr_SY","Dimashq_SY","Halab_SY","Hamah_SY","Hims_SY","Idlib_SY","Rif Dimashq_SY","Tartus_SY"];
        var sz_region=["Hhohho_SZ","Lubombo_SZ","Manzini_SZ","Shiselweni_SZ"];
        var tc_region=["Turks and Caicos Islands_TC"];
        var td_region=["Bahr el Gazel_TD","Batha_TD","Borkou_TD","Chari-Baguirmi_TD","Guera_TD","Hadjer Lamis_TD","Kanem_TD","Lac_TD","Logone-Occidental_TD","Logone-Oriental_TD","Mandoul_TD","Mayo-Kebbi-Est_TD","Mayo-Kebbi-Ouest_TD","Moyen-Chari_TD","Ouaddai_TD","Salamat_TD","Sila_TD","Tandjile_TD","Tibesti_TD","Ville de Ndjamena_TD","Wadi Fira_TD"];
        var tf_region=["French Southern Territories_TF"];
        var tg_region=["Centrale_TG","Kara_TG","Maritime_TG","Plateaux_TG","Savanes_TG"];
        var th_region=["Amnat Charoen_TH","Ang Thong_TH","Bueng Kan_TH","Buri Ram_TH","Chachoengsao_TH","Chai Nat_TH","Chaiyaphum_TH","Chanthaburi_TH","Chiang Mai_TH","Chiang Rai_TH","Chon Buri_TH","Chumphon_TH","Kalasin_TH","Kamphaeng Phet_TH","Kanchanaburi_TH","Khon Kaen_TH","Krabi_TH","Krung Thep Maha Nakhon_TH","Lampang_TH","Lamphun_TH","Loei_TH","Lop Buri_TH","Mae Hong Son_TH","Maha Sarakham_TH","Mukdahan_TH","Nakhon Nayok_TH","Nakhon Pathom_TH","Nakhon Phanom_TH","Nakhon Ratchasima_TH","Nakhon Sawan_TH","Nakhon Si Thammarat_TH","Nan_TH","Narathiwat_TH","Nong Bua Lam Phu_TH","Nong Khai_TH","Nonthaburi_TH","Pathum Thani_TH","Pattani_TH","Phangnga_TH","Phatthalung_TH","Phayao_TH","Phetchabun_TH","Phetchaburi_TH","Phichit_TH","Phitsanulok_TH","Phra Nakhon Si Ayutthaya_TH","Phrae_TH","Phuket_TH","Prachin Buri_TH","Prachuap Khiri Khan_TH","Ranong_TH","Ratchaburi_TH","Rayong_TH","Roi Et_TH","Sa Kaeo_TH","Sakon Nakhon_TH","Samut Prakan_TH","Samut Sakhon_TH","Samut Songkhram_TH","Saraburi_TH","Satun_TH","Si Sa Ket_TH","Sing Buri_TH","Songkhla_TH","Sukhothai_TH","Suphan Buri_TH","Surat Thani_TH","Surin_TH","Tak_TH","Trang_TH","Trat_TH","Ubon Ratchathani_TH","Udon Thani_TH","Uthai Thani_TH","Uttaradit_TH","Yala_TH","Yasothon_TH"];
        var tj_region=["Dushanbe_TJ","Khatlon_TJ","Kuhistoni Badakhshon_TJ","Nohiyahoi Tobei Jumhuri_TJ","Sughd_TJ"];
        var tk_region=["Tokelau_TK"];
        var tl_region=["Aileu_TL","Ainaro_TL","Baucau_TL","Bobonaro_TL","Cova Lima_TL","Dili_TL","Ermera_TL","Lautem_TL","Liquica_TL","Manatuto_TL","Manufahi_TL","Oecussi_TL","Viqueque_TL"];
        var tm_region=["Ahal_TM","Balkan_TM","Dasoguz_TM","Lebap_TM","Mary_TM"];
        var tn_region=["Beja_TN","Ben Arous_TN","Bizerte_TN","Gabes_TN","Gafsa_TN","Jendouba_TN","Kairouan_TN","Kasserine_TN","Kebili_TN","L'Ariana_TN","La Manouba_TN","Le Kef_TN","Mahdia_TN","Medenine_TN","Monastir_TN","Nabeul_TN","Sfax_TN","Sidi Bouzid_TN","Siliana_TN","Sousse_TN","Tataouine_TN","Tozeur_TN","Tunis_TN","Zaghouan_TN"];
        var to_region=["\'Eua_TO","Ha'apai_TO","Niuas_TO","Tongatapu_TO","Vava'u_TO"];
        var tr_region=["Adana_TR","Adiyaman_TR","Afyonkarahisar_TR","Agri_TR","Aksaray_TR","Amasya_TR","Ankara_TR","Antalya_TR","Ardahan_TR","Artvin_TR","Aydin_TR","Balikesir_TR","Bartin_TR","Batman_TR","Bayburt_TR","Bilecik_TR","Bingol_TR","Bitlis_TR","Bolu_TR","Burdur_TR","Bursa_TR","Canakkale_TR","Cankiri_TR","Corum_TR","Denizli_TR","Diyarbakir_TR","Duzce_TR","Edirne_TR","Elazig_TR","Erzincan_TR","Erzurum_TR","Eskisehir_TR","Gaziantep_TR","Giresun_TR","Gumushane_TR","Hakkari_TR","Hatay_TR","Igdir_TR","Isparta_TR","Istanbul_TR","Izmir_TR","Kahramanmaras_TR","Karabuk_TR","Karaman_TR","Kars_TR","Kastamonu_TR","Kayseri_TR","Kilis_TR","Kirikkale_TR","Kirklareli_TR","Kirsehir_TR","Kocaeli_TR","Konya_TR","Kutahya_TR","Malatya_TR","Manisa_TR","Mardin_TR","Mersin_TR","Mugla_TR","Mus_TR","Nevsehir_TR","Nigde_TR","Ordu_TR","Osmaniye_TR","Rize_TR","Sakarya_TR","Samsun_TR","Sanliurfa_TR","Siirt_TR","Sinop_TR","Sirnak_TR","Sivas_TR","Tekirdag_TR","Tokat_TR","Trabzon_TR","Tunceli_TR","Usak_TR","Van_TR","Yalova_TR","Yozgat_TR","Zonguldak_TR"];
        var tt_region=["Arima_TT","Chaguanas_TT","Couva-Tabaquite-Talparo_TT","Diego Martin_TT","Mayaro-Rio Claro_TT","Penal-Debe_TT","Point Fortin_TT","Port of Spain_TT","Princes Town_TT","San Fernando_TT","San Juan-Laventille_TT","Sangre Grande_TT","Siparia_TT","Tobago_TT","Tunapuna-Piarco_TT"];
        var tv_region=["Funafuti_TV","Nanumaga_TV","Nanumea_TV","Niutao_TV","Nui_TV","Nukufetau_TV","Nukulaelae_TV","Vaitupu_TV"];
        var tw_region=["Changhua_TW","Chiayi_TW","Hsinchu_TW","Hualien_TW","Kaohsiung_TW","Keelung_TW","Kinmen_TW","Lienchiang_TW","Miaoli_TW","Nantou_TW","New Taipei_TW","Penghu_TW","Pingtung_TW","Taichung_TW","Tainan_TW","Taipei_TW","Taitung_TW","Taoyuan_TW","Yilan_TW","Yunlin_TW"];
        var tz_region=["Arusha_TZ","Dar es Salaam_TZ","Dodoma_TZ","Geita_TZ","Iringa_TZ","Kagera_TZ","Kaskazini Pemba_TZ","Kaskazini Unguja_TZ","Katavi_TZ","Kigoma_TZ","Kilimanjaro_TZ","Kusini Pemba_TZ","Kusini Unguja_TZ","Lindi_TZ","Manyara_TZ","Mara_TZ","Mbeya_TZ","Mjini Magharibi_TZ","Morogoro_TZ","Mtwara_TZ","Mwanza_TZ","Njombe_TZ","Pwani_TZ","Rukwa_TZ","Ruvuma_TZ","Shinyanga_TZ","Simiyu_TZ","Singida_TZ","Tabora_TZ","Tanga_TZ"];
        var ua_region=["Avtonomna Respublika Krym_UA","Cherkaska oblast_UA","Chernihivska oblast_UA","Chernivetska oblast_UA","Dnipropetrovska oblast_UA","Donetska oblast_UA","Ivano-Frankivska oblast_UA","Kharkivska oblast_UA","Khersonska oblast_UA","Khmelnytska oblast_UA","Kirovohradska oblast_UA","Kyiv_UA","Kyivska oblast_UA","Luhanska oblast_UA","Lvivska oblast_UA","Mykolaivska oblast_UA","Odeska oblast_UA","Poltavska oblast_UA","Rivnenska oblast_UA","Sevastopol_UA","Sumska oblast_UA","Ternopilska oblast_UA","Vinnytska oblast_UA","Volynska oblast_UA","Zakarpatska oblast_UA","Zaporizka oblast_UA","Zhytomyrska oblast_UA"];
        var ug_region=["Abim_UG","Adjumani_UG","Agago_UG","Alebtong_UG","Amolatar_UG","Amudat_UG","Amuria_UG","Amuru_UG","Apac_UG","Arua_UG","Budaka_UG","Bududa_UG","Bugiri_UG","Buhweju_UG","Buikwe_UG","Bukedea_UG","Bukomansibi_UG","Bukwa_UG","Bulambuli_UG","Buliisa_UG","Bundibugyo_UG","Bushenyi_UG","Busia_UG","Butaleja_UG","Buvuma_UG","Buyende_UG","Dokolo_UG","Gomba_UG","Gulu_UG","Hoima_UG","Ibanda_UG","Iganga_UG","Isingiro_UG","Jinja_UG","Kaabong_UG","Kabale_UG","Kabarole_UG","Kaberamaido_UG","Kalangala_UG","Kaliro_UG","Kalungu_UG","Kampala_UG","Kamuli_UG","Kamwenge_UG","Kanungu_UG","Kapchorwa_UG","Kasese_UG","Katakwi_UG","Kayunga_UG","Kibaale_UG","Kiboga_UG","Kibuku_UG","Kiruhura_UG","Kiryandongo_UG","Kisoro_UG","Kitgum_UG","Koboko_UG","Kole_UG","Kotido_UG","Kumi_UG","Kween_UG","Kyankwanzi_UG","Kyegegwa_UG","Kyenjojo_UG","Lamwo_UG","Lira_UG","Luuka_UG","Luwero_UG","Lwengo_UG","Lyantonde_UG","Manafwa_UG","Maracha_UG","Masaka_UG","Masindi_UG","Mayuge_UG","Mbale_UG","Mbarara_UG","Mitooma_UG","Mityana_UG","Moroto_UG","Moyo_UG","Mpigi_UG","Mubende_UG","Mukono_UG","Nakapiripirit_UG","Nakaseke_UG","Nakasongola_UG","Namayingo_UG","Namutumba_UG","Napak_UG","Nebbi_UG","Ngora_UG","Ntoroko_UG","Ntungamo_UG","Nwoya_UG","Otuke_UG","Oyam_UG","Pader_UG","Pallisa_UG","Rakai_UG","Rubirizi_UG","Rukungiri_UG","Sembabule_UG","Serere_UG","Sheema_UG","Sironko_UG","Soroti_UG","Tororo_UG","Wakiso_UG","Yumbe_UG","Zombo_UG"];
        var um_region=["Baker Island_UM","Howland Island_UM","Jarvis Island_UM","Palmyra Atoll_UM"];
        var us_region=["Alabama_US","Alaska_US","Arizona_US","Arkansas_US","California_US","Colorado_US","Connecticut_US","Delaware_US","District of Columbia_US","Florida_US","Georgia_US","Hawaii_US","Idaho_US","Illinois_US","Indiana_US","Iowa_US","Kansas_US","Kentucky_US","Louisiana_US","Maine_US","Maryland_US","Massachusetts_US","Michigan_US","Minnesota_US","Mississippi_US","Missouri_US","Montana_US","Nebraska_US","Nevada_US","New Hampshire_US","New Jersey_US","New Mexico_US","New York_US","North Carolina_US","North Dakota_US","Ohio_US","Oklahoma_US","Oregon_US","Pennsylvania_US","Rhode Island_US","South Carolina_US","South Dakota_US","Tennessee_US","Texas_US","Utah_US","Vermont_US","Virginia_US","Washington_US","West Virginia_US","Wisconsin_US","Wyoming_US"];
        var uy_region=["Artigas_UY","Canelones_UY","Cerro Largo_UY","Colonia_UY","Durazno_UY","Flores_UY","Florida_UY","Lavalleja_UY","Maldonado_UY","Montevideo_UY","Paysandu_UY","Rio Negro_UY","Rivera_UY","Rocha_UY","Salto_UY","San Jose_UY","Soriano_UY","Tacuarembo_UY","Treinta y Tres_UY"];
        var uz_region=["Andijon_UZ","Buxoro_UZ","Farg'ona_UZ","Jizzax_UZ","Namangan_UZ","Navoiy_UZ","Qashqadaryo_UZ","Qoraqalpog'iston Respublikasi_UZ","Samarqand_UZ","Sirdaryo_UZ","Surxondaryo_UZ","Toshkent_UZ","Xorazm_UZ"];
        var va_region=["Vatican City_VA"];
        var vc_region=["Charlotte_VC","Grenadines_VC","Saint David_VC","Saint George_VC","Saint Patrick_VC"];
        var ve_region=["Amazonas_VE","Anzoategui_VE","Apure_VE","Aragua_VE","Barinas_VE","Bolivar_VE","Carabobo_VE","Cojedes_VE","Delta Amacuro_VE","Dependencias Federales_VE","Distrito Capital_VE","Falcon_VE","Guarico_VE","Lara_VE","Merida_VE","Miranda_VE","Monagas_VE","Nueva Esparta_VE","Portuguesa_VE","Sucre_VE","Tachira_VE","Trujillo_VE","Vargas_VE","Yaracuy_VE","Zulia_VE"];
        var vg_region=["Virgin Islands, British_VG"];
        var vi_region=["Virgin Islands, U.S._VI"];
        var vn_region=["An Giang_VN","Ba Ria - Vung Tau_VN","Bac Giang_VN","Bac Kan_VN","Bac Lieu_VN","Bac Ninh_VN","Ben Tre_VN","Binh Dinh_VN","Binh Duong_VN","Binh Phuoc_VN","Binh Thuan_VN","Ca Mau_VN","Can Tho_VN","Cao Bang_VN","Da Nang_VN","Dak Lak_VN","Dak Nong_VN","Dien Bien_VN","Dong Nai_VN","Dong Thap_VN","Gia Lai_VN","Ha Giang_VN","Ha Nam_VN","Ha Noi_VN","Ha Tinh_VN","Hai Duong_VN","Hai Phong_VN","Ho Chi Minh_VN","Hoa Binh_VN","Hung Yen_VN","Khanh Hoa_VN","Kien Giang_VN","Kon Tum_VN","Lai Chau_VN","Lam Dong_VN","Lang Son_VN","Lao Cai_VN","Long An_VN","Nam Dinh_VN","Nghe An_VN","Ninh Binh_VN","Ninh Thuan_VN","Phu Tho_VN","Phu Yen_VN","Quang Binh_VN","Quang Nam_VN","Quang Ngai_VN","Quang Ninh_VN","Quang Tri_VN","Soc Trang_VN","Son La_VN","Tay Ninh_VN","Thai Binh_VN","Thai Nguyen_VN","Thanh Hoa_VN","Thua Thien-Hue_VN","Tien Giang_VN","Tra Vinh_VN","Tuyen Quang_VN","Vinh Long_VN","Vinh Phuc_VN","Yen Bai_VN"];
        var vu_region=["Malampa_VU","Penama_VU","Sanma_VU","Shefa_VU","Tafea_VU","Torba_VU"];
        var wf_region=["Alo_WF","Sigave_WF","Uvea_WF"];
        var ws_region=["A'ana_WS","Aiga-i-le-Tai_WS","Atua_WS","Fa'asaleleaga_WS","Gagaifomauga_WS","Palauli_WS","Satupa'itea_WS","Tuamasaga_WS","Va'a-o-Fonoti_WS","Vaisigano_WS"];
        var ye_region=["\'Adan_YE","\'Amran_YE","Abyan_YE","Ad Dali'_YE","Al Bayda'_YE","Al Hudaydah_YE","Al Jawf_YE","Al Mahrah_YE","Al Mahwit_YE","Amanat al 'Asimah_YE","Dhamar_YE","Hadramawt_YE","Hajjah_YE","Ibb_YE","Lahij_YE","Ma'rib_YE","Raymah_YE","Sa'dah_YE","San'a'_YE","Shabwah_YE","Ta'izz_YE"];
        var yt_region=["Acoua_YT","Bandraboua_YT","Bandrele_YT","Boueni_YT","Chiconi_YT","Chirongui_YT","Dzaoudzi_YT","Kani-Keli_YT","Koungou_YT","Mamoudzou_YT","Mtsamboro_YT","Ouangani_YT","Pamandzi_YT","Sada_YT","Tsingoni_YT"];
        var za_region=["Eastern Cape_ZA","Free State_ZA","Gauteng_ZA","Kwazulu-Natal_ZA","Limpopo_ZA","Mpumalanga_ZA","North-West_ZA","Northern Cape_ZA","Western Cape_ZA"];
        var zm_region=["Central_ZM","Copperbelt_ZM","Eastern_ZM","Luapula_ZM","Lusaka_ZM","North-Western_ZM","Northern_ZM","Southern_ZM","Western_ZM"];
        var zw_region=["Bulawayo_ZW","Harare_ZW","Manicaland_ZW","Mashonaland Central_ZW","Mashonaland East_ZW","Mashonaland West_ZW","Masvingo_ZW","Matabeleland North_ZW","Matabeleland South_ZW","Midlands_ZW"];

        //get total length of array
        var arr = [ad_region.length,ae_region.length,af_region.length,ag_region.length,ai_region.length,al_region.length,am_region.length,ao_region.length,aq_region.length,ar_region.length,as_region.length,at_region.length,au_region.length,aw_region.length,ax_region.length,az_region.length,ba_region.length,bb_region.length,bd_region.length,be_region.length,bf_region.length,bg_region.length,bh_region.length,bi_region.length,bj_region.length,bl_region.length,bm_region.length,bn_region.length,bo_region.length,bq_region.length,br_region.length,bs_region.length,bt_region.length,bw_region.length,by_region.length,bz_region.length,ca_region.length,cc_region.length,cd_region.length,cf_region.length,cg_region.length,ch_region.length,ci_region.length,ck_region.length,cl_region.length,cm_region.length,cn_region.length,co_region.length,cr_region.length,cu_region.length,cv_region.length,cw_region.length,cx_region.length,cy_region.length,cz_region.length,de_region.length,dj_region.length,dk_region.length,dm_region.length,do1_region.length,dz_region.length,ec_region.length,ee_region.length,eg_region.length,eh_region.length,er_region.length,es_region.length,et_region.length,fi_region.length,fj_region.length,fk_region.length,fm_region.length,fo_region.length,fr_region.length,ga_region.length,gb_region.length,gd_region.length,ge_region.length,gf_region.length,gg_region.length,gh_region.length,gi_region.length,gl_region.length,gm_region.length,gn_region.length,gp_region.length,gq_region.length,gr_region.length,gs_region.length,gt_region.length,gu_region.length,gw_region.length,gy_region.length,hk_region.length,hn_region.length,hr_region.length,ht_region.length,hu_region.length,id_region.length,ie_region.length,il_region.length,im_region.length,in1_region.length,io_region.length,iq_region.length,ir_region.length,is_region.length,it_region.length,je_region.length,jm_region.length,jo_region.length,jp_region.length,ke_region.length,kg_region.length,kh_region.length,ki_region.length,km_region.length,kn_region.length,kp_region.length,kr_region.length,kw_region.length,ky_region.length,kz_region.length,la_region.length,lb_region.length,lc_region.length,li_region.length,lk_region.length,lr_region.length,ls_region.length,lt_region.length,lu_region.length,lv_region.length,ly_region.length,ma_region.length,mc_region.length,md_region.length,me_region.length,mf_region.length,mg_region.length,mh_region.length,mk_region.length,ml_region.length,mm_region.length,mn_region.length,mo_region.length,mp_region.length,mq_region.length,mr_region.length,ms_region.length,mt_region.length,mu_region.length,mv_region.length,mw_region.length,mx_region.length,my_region.length,mz_region.length,na_region.length,nc_region.length,ne_region.length,nf_region.length,ng_region.length,ni_region.length,nl_region.length,no_region.length,np_region.length,nr_region.length,nu_region.length,nz_region.length,om_region.length,pa_region.length,pe_region.length,pf_region.length,pg_region.length,ph_region.length,pk_region.length,pl_region.length,pm_region.length,pn_region.length,pr_region.length,ps_region.length,pt_region.length,pw_region.length,py_region.length,qa_region.length,re_region.length,ro_region.length,rs_region.length,ru_region.length,rw_region.length,sa_region.length,sb_region.length,sc_region.length,sd_region.length,se_region.length,sg_region.length,sh_region.length,si_region.length,sj_region.length,sk_region.length,sl_region.length,sm_region.length,sn_region.length,so_region.length,sr_region.length,ss_region.length,st_region.length,sv_region.length,sx_region.length,sy_region.length,sz_region.length,tc_region.length,td_region.length,tf_region.length,tg_region.length,th_region.length,tj_region.length,tk_region.length,tl_region.length,tm_region.length,tn_region.length,to_region.length,tr_region.length,tt_region.length,tv_region.length,tw_region.length,tz_region.length,ua_region.length,ug_region.length,um_region.length,us_region.length,uy_region.length,uz_region.length,va_region.length,vc_region.length,ve_region.length,vg_region.length,vi_region.length,vn_region.length,vu_region.length,wf_region.length,ws_region.length,ye_region.length,yt_region.length,za_region.length,zm_region.length,zw_region.length];
        var arrlen = Math.max.apply(Math, arr);

        var ad =[];var ae =[];var af=[];var ag=[];var ai=[];var al=[];var am=[];var ao=[];var aq=[];var ar=[];var as=[];var at=[];var au=[];var aw=[];var ax=[];var az=[];
        var ba=[];var bb=[];var bd=[];var be=[];var bf=[];var bg=[];var bh=[];var bi=[];var bj=[];var bl=[]; var bm=[];var bn=[];var bo=[];var bq=[];var br=[];var bs=[];var bt=[];var bw=[];var by=[];var bz=[];
        var ca=[];var cc=[];var cd=[];var cf=[];var cg=[];var ch=[];var ci=[];var ck=[];var cl=[];var cm=[];var cn=[];var co=[];var cr=[];var cu=[];var cv=[];var cw=[];var cx=[];var cy=[];var cz=[];
        var de=[];var dj=[];var dk=[];var dm=[];var do1=[];var dz=[];
        var ec=[];var ee=[];var eg=[];var eh=[];var er=[];var es=[];var et=[];
        var fi=[];var fj=[];var fk=[];var fm=[];var fo=[];var fr=[];
        var ga=[];var gb=[];var gd=[];var ge=[];var gf=[];var gg=[];var gh=[];var gi=[];var gl=[];var gm=[];var gn=[];var gp=[];var gq=[];var gr=[];var gs=[];var gt=[];var gu=[];var gw=[];var gy=[];
        var hk=[];var hn=[];var hr=[];var ht=[];var hu=[];
        var id=[];var ie=[];var il=[];var im=[];var in1=[];var io=[];var iq=[];var ir=[];var is=[];var it=[];
        var je=[];var jm=[];var jo=[];var jp=[];
        var ke=[];var kg=[];var kh=[];var ki=[];var km=[];var kn=[];var kp=[];var kr=[];var kw=[];var ky=[];var kz=[];
        var la=[];var lb=[];var lc=[];var li=[];var lk=[];var lr=[];var ls=[];var lt=[];var lu=[];var lv=[];var ly=[];
        var ma=[];var mc=[];var md=[];var me=[];var mf=[];var mg=[];var mh=[];var mk=[];var ml=[];var mm=[];var mn=[];var mo=[];var mp=[];var mq=[];var mr=[];var ms=[];var mt=[];var mu=[];var mv=[];var mw=[];var mx=[];var my=[];var mz=[];
        var na=[];var nc=[];var ne=[];var nf=[];var ng=[];var ni=[];var nl=[];var no=[];var np=[];var nr=[];var nu=[];var nz=[];
        var om=[];
        var pa=[];var pe=[];var pf=[];var pg=[];var ph=[];var pk=[];var pl=[];var pm=[];var pn=[];var pr=[];var ps=[];var pt=[];var pw=[];var py=[];
        var qa=[];
        var re=[];var ro=[];var rs=[];var ru=[];var rw=[];
        var sa=[];var sb=[];var sc=[];var sd=[];var se=[];var sg=[];var sh=[];var si=[];var sj=[];var sk=[];var sl=[];var sm=[];var sn=[];var so=[];var sr=[];var ss=[];var st=[];var sv=[];var sx=[];var sy=[];var sz=[];
        var tc=[];var td=[];var tf=[];var tg=[];var th=[];var tj=[];var tk=[];var tl=[];var tm=[];var tn=[];var to=[];var tr=[];var tt=[];var tv=[];var tw=[];var tz=[];
        var ua=[];var ug=[];var um=[];var us=[];var uy=[];var uz=[];
        var va=[];var vc=[];var ve=[];var vg=[];var vi=[];var vn=[];var vu=[];
        var wf=[];var ws=[];
        var ye=[];var yt=[];
        var za=[];var zm=[];var zw=[];

        for (var i=0; i<arrlen; i++) {
            ad +=(get.gettext(ad_region[i])+"|");ae +=(get.gettext(ae_region[i])+"|");af +=(get.gettext(af_region[i])+"|");ag +=(get.gettext(ag_region[i])+"|");ai +=(get.gettext(ai_region[i])+"|");al +=(get.gettext(al_region[i])+"|");am +=(get.gettext(am_region[i])+"|");ao +=(get.gettext(ao_region[i])+"|");aq +=(get.gettext(aq_region[i])+"|");ar +=(get.gettext(ar_region[i])+"|");as +=(get.gettext(as_region[i])+"|");at +=(get.gettext(at_region[i])+"|");au +=(get.gettext(au_region[i])+"|");aw +=(get.gettext(aw_region[i])+"|");ax +=(get.gettext(ax_region[i])+"|");az +=(get.gettext(az_region[i])+"|");
            ba +=(get.gettext(ba_region[i])+"|");bb +=(get.gettext(bb_region[i])+"|");bd +=(get.gettext(bd_region[i])+"|");be +=(get.gettext(be_region[i])+"|");bf +=(get.gettext(bf_region[i])+"|");bg +=(get.gettext(bg_region[i])+"|");bh +=(get.gettext(bh_region[i])+"|");bi +=(get.gettext(bi_region[i])+"|");bj +=(get.gettext(bj_region[i])+"|");bl +=(get.gettext(bl_region[i])+"|");bm +=(get.gettext(bm_region[i])+"|");bn +=(get.gettext(bn_region[i])+"|");bo +=(get.gettext(bo_region[i])+"|");bq +=(get.gettext(bq_region[i])+"|");br +=(get.gettext(br_region[i])+"|");bs +=(get.gettext(bs_region[i])+"|");bt +=(get.gettext(bt_region[i])+"|");bw +=(get.gettext(bw_region[i])+"|");by +=(get.gettext(by_region[i])+"|");bz +=(get.gettext(bz_region[i])+"|");
            ca +=(get.gettext(ca_region[i])+"|");cc +=(get.gettext(cc_region[i])+"|");cd +=(get.gettext(cd_region[i])+"|");cf +=(get.gettext(cf_region[i])+"|");cg +=(get.gettext(cg_region[i])+"|");ch +=(get.gettext(ch_region[i])+"|");ci +=(get.gettext(ci_region[i])+"|");ck +=(get.gettext(ck_region[i])+"|");cl +=(get.gettext(cl_region[i])+"|");cm +=(get.gettext(cm_region[i])+"|");cn +=(get.gettext(cn_region[i])+"|");co +=(get.gettext(co_region[i])+"|");cr +=(get.gettext(cr_region[i])+"|");cu +=(get.gettext(cu_region[i])+"|");cv +=(get.gettext(cv_region[i])+"|");cw +=(get.gettext(cw_region[i])+"|");cx +=(get.gettext(cx_region[i])+"|");cy +=(get.gettext(cy_region[i])+"|");cz +=(get.gettext(cz_region[i])+"|");
            de +=(get.gettext(de_region[i])+"|");dj +=(get.gettext(dj_region[i])+"|");dk +=(get.gettext(dk_region[i])+"|");dm +=(get.gettext(dm_region[i])+"|");do1 +=(get.gettext(do1_region[i])+"|");dz +=(get.gettext(dz_region[i])+"|");
            ec +=(get.gettext(ec_region[i])+"|");ee +=(get.gettext(ee_region[i])+"|");eg +=(get.gettext(eg_region[i])+"|");eh +=(get.gettext(eh_region[i])+"|");er +=(get.gettext(er_region[i])+"|");es +=(get.gettext(es_region[i])+"|");et +=(get.gettext(et_region[i])+"|");
            fi +=(get.gettext(fi_region[i])+"|");fj +=(get.gettext(fj_region[i])+"|");fk +=(get.gettext(fk_region[i])+"|");fm +=(get.gettext(fm_region[i])+"|");fo +=(get.gettext(fo_region[i])+"|");fr +=(get.gettext(fr_region[i])+"|");
            ga +=(get.gettext(ga_region[i])+"|");gb +=(get.gettext(gb_region[i])+"|");gd +=(get.gettext(gd_region[i])+"|");ge +=(get.gettext(ge_region[i])+"|");gf +=(get.gettext(gf_region[i])+"|");gg +=(get.gettext(gg_region[i])+"|");gh +=(get.gettext(gh_region[i])+"|");gi +=(get.gettext(gi_region[i])+"|");gl +=(get.gettext(gl_region[i])+"|");gm +=(get.gettext(gm_region[i])+"|");gn +=(get.gettext(gn_region[i])+"|");gp +=(get.gettext(gp_region[i])+"|");gq +=(get.gettext(gq_region[i])+"|");gr +=(get.gettext(gr_region[i])+"|");gs +=(get.gettext(gs_region[i])+"|");gt +=(get.gettext(gt_region[i])+"|");gu +=(get.gettext(gu_region[i])+"|");gw +=(get.gettext(gw_region[i])+"|");gy +=(get.gettext(gy_region[i])+"|");
            hk +=(get.gettext(hk_region[i])+"|");hn +=(get.gettext(hn_region[i])+"|");hr +=(get.gettext(hr_region[i])+"|");ht +=(get.gettext(ht_region[i])+"|");hu +=(get.gettext(hu_region[i])+"|");
            id +=(get.gettext(id_region[i])+"|");ie +=(get.gettext(ie_region[i])+"|");il +=(get.gettext(il_region[i])+"|");im +=(get.gettext(im_region[i])+"|");in1 +=(get.gettext(in1_region[i])+"|");io +=(get.gettext(io_region[i])+"|");iq +=(get.gettext(iq_region[i])+"|");ir +=(get.gettext(ir_region[i])+"|");is +=(get.gettext(is_region[i])+"|");it +=(get.gettext(it_region[i])+"|");
            je +=(get.gettext(je_region[i])+"|");jm +=(get.gettext(jm_region[i])+"|");jo +=(get.gettext(jo_region[i])+"|");jp +=(get.gettext(jp_region[i])+"|");
            ke +=(get.gettext(ke_region[i])+"|");kg +=(get.gettext(kg_region[i])+"|");kh +=(get.gettext(kh_region[i])+"|");ki +=(get.gettext(ki_region[i])+"|");km +=(get.gettext(km_region[i])+"|");kn +=(get.gettext(kn_region[i])+"|");kp +=(get.gettext(kp_region[i])+"|");kr +=(get.gettext(kr_region[i])+"|");kw +=(get.gettext(kw_region[i])+"|");ky +=(get.gettext(ky_region[i])+"|");kz +=(get.gettext(kz_region[i])+"|");
            la +=(get.gettext(la_region[i])+"|");lb +=(get.gettext(lb_region[i])+"|");lc +=(get.gettext(lc_region[i])+"|");li +=(get.gettext(li_region[i])+"|");lk +=(get.gettext(lk_region[i])+"|");lr +=(get.gettext(lr_region[i])+"|");ls +=(get.gettext(ls_region[i])+"|");lt +=(get.gettext(lt_region[i])+"|");lu +=(get.gettext(lu_region[i])+"|");lv +=(get.gettext(lv_region[i])+"|");ly +=(get.gettext(ly_region[i])+"|");
            ma +=(get.gettext(ma_region[i])+"|");mc +=(get.gettext(mc_region[i])+"|");md +=(get.gettext(md_region[i])+"|");me +=(get.gettext(me_region[i])+"|");mf +=(get.gettext(mf_region[i])+"|");mg +=(get.gettext(mg_region[i])+"|");mh +=(get.gettext(mh_region[i])+"|");mk +=(get.gettext(mk_region[i])+"|");ml +=(get.gettext(ml_region[i])+"|");mm +=(get.gettext(mm_region[i])+"|");mn +=(get.gettext(mn_region[i])+"|");mo +=(get.gettext(mo_region[i])+"|");mp +=(get.gettext(mp_region[i])+"|");mq +=(get.gettext(mq_region[i])+"|");mr +=(get.gettext(mr_region[i])+"|");ms +=(get.gettext(ms_region[i])+"|");mt +=(get.gettext(mt_region[i])+"|");mu +=(get.gettext(mu_region[i])+"|");mv +=(get.gettext(mv_region[i])+"|");mw +=(get.gettext(mw_region[i])+"|");mx +=(get.gettext(mx_region[i])+"|");my +=(get.gettext(my_region[i])+"|");mz +=(get.gettext(mz_region[i])+"|");
            na +=(get.gettext(na_region[i])+"|");nc +=(get.gettext(nc_region[i])+"|");ne +=(get.gettext(ne_region[i])+"|");nf +=(get.gettext(nf_region[i])+"|");ng +=(get.gettext(ng_region[i])+"|");ni +=(get.gettext(ni_region[i])+"|");nl +=(get.gettext(nl_region[i])+"|");no +=(get.gettext(no_region[i])+"|");np +=(get.gettext(np_region[i])+"|");nr +=(get.gettext(nr_region[i])+"|");nu +=(get.gettext(nu_region[i])+"|");nz +=(get.gettext(nz_region[i])+"|");
            om +=(get.gettext(om_region[i])+"|");
            pa +=(get.gettext(pa_region[i])+"|");pe +=(get.gettext(pe_region[i])+"|");pf +=(get.gettext(pf_region[i])+"|");pg +=(get.gettext(pg_region[i])+"|");ph +=(get.gettext(ph_region[i])+"|");pk +=(get.gettext(pk_region[i])+"|");pl +=(get.gettext(pl_region[i])+"|");pm +=(get.gettext(pm_region[i])+"|");pn +=(get.gettext(pn_region[i])+"|");pr +=(get.gettext(pr_region[i])+"|");ps +=(get.gettext(ps_region[i])+"|");pt +=(get.gettext(pt_region[i])+"|");pw +=(get.gettext(pw_region[i])+"|");py +=(get.gettext(py_region[i])+"|");
            qa +=(get.gettext(qa_region[i])+"|");
            re +=(get.gettext(re_region[i])+"|");ro +=(get.gettext(ro_region[i])+"|");rs +=(get.gettext(rs_region[i])+"|");ru +=(get.gettext(ru_region[i])+"|");rw +=(get.gettext(rw_region[i])+"|");
            sa +=(get.gettext(sa_region[i])+"|");sb +=(get.gettext(sb_region[i])+"|");sc +=(get.gettext(sc_region[i])+"|");sd +=(get.gettext(sd_region[i])+"|");se +=(get.gettext(se_region[i])+"|");sg +=(get.gettext(sg_region[i])+"|");sh +=(get.gettext(sh_region[i])+"|");si +=(get.gettext(si_region[i])+"|");sj +=(get.gettext(sj_region[i])+"|");sk +=(get.gettext(sk_region[i])+"|");sl +=(get.gettext(sl_region[i])+"|");sm +=(get.gettext(sm_region[i])+"|");sn +=(get.gettext(sn_region[i])+"|");so +=(get.gettext(so_region[i])+"|");sr +=(get.gettext(sr_region[i])+"|");ss +=(get.gettext(ss_region[i])+"|");st +=(get.gettext(st_region[i])+"|");sv +=(get.gettext(sv_region[i])+"|");sx +=(get.gettext(sx_region[i])+"|");sy +=(get.gettext(sy_region[i])+"|");sz +=(get.gettext(sz_region[i])+"|");
            tc +=(get.gettext(tc_region[i])+"|");td +=(get.gettext(td_region[i])+"|");tf +=(get.gettext(tf_region[i])+"|");tg +=(get.gettext(tg_region[i])+"|");th +=(get.gettext(th_region[i])+"|");tj +=(get.gettext(tj_region[i])+"|");tk +=(get.gettext(tk_region[i])+"|");tl +=(get.gettext(tl_region[i])+"|");tm +=(get.gettext(tm_region[i])+"|");tn +=(get.gettext(tn_region[i])+"|");to +=(get.gettext(to_region[i])+"|");tr +=(get.gettext(tr_region[i])+"|");tt +=(get.gettext(tt_region[i])+"|");tv +=(get.gettext(tv_region[i])+"|");tw +=(get.gettext(tw_region[i])+"|");tz +=(get.gettext(tz_region[i])+"|");
            ua +=(get.gettext(ua_region[i])+"|");ug +=(get.gettext(ug_region[i])+"|");um +=(get.gettext(um_region[i])+"|");us +=(get.gettext(us_region[i])+"|");uy +=(get.gettext(uy_region[i])+"|");uz +=(get.gettext(uz_region[i])+"|");
            va +=(get.gettext(va_region[i])+"|");vc +=(get.gettext(vc_region[i])+"|");ve +=(get.gettext(ve_region[i])+"|");vg +=(get.gettext(vg_region[i])+"|");vi +=(get.gettext(vi_region[i])+"|");vn +=(get.gettext(vn_region[i])+"|");vu +=(get.gettext(vu_region[i])+"|");
            wf +=(get.gettext(wf_region[i])+"|");ws +=(get.gettext(ws_region[i])+"|");
            ye +=(get.gettext(ye_region[i])+"|");yt +=(get.gettext(yt_region[i])+"|");
            za +=(get.gettext(za_region[i])+"|");zm +=(get.gettext(zm_region[i])+"|");zw +=(get.gettext(zw_region[i])+"|");
        }

        var geodatasource_data=[["AF",af_country,af.slice(0, -(arrlen-af_region.length+1))],["AX",ax_country,ax.slice(0, -(arrlen-ax_region.length+1))],["AL",al_country,al.slice(0, -(arrlen-al_region.length+1))],["DZ",dz_country,dz.slice(0, -(arrlen-dz_region.length+1))],["AS",as_country,as.slice(0, -(arrlen-as_region.length+1))],["AD",ad_country,ad.slice(0, -(arrlen-ad_region.length+1))],["AO",ao_country,ao.slice(0, -(arrlen-ao_region.length+1))],["AI",ai_country,ai.slice(0, -(arrlen-ai_region.length+1))],["AQ",aq_country,aq.slice(0, -(arrlen-aq_region.length+1))],["AG",ag_country,ag.slice(0, -(arrlen-ag_region.length+1))],["AR",ar_country,ar.slice(0, -(arrlen-ar_region.length+1))],["AM",am_country,am.slice(0, -(arrlen-am_region.length+1))],["AW",aw_country,aw.slice(0, -(arrlen-aw_region.length+1))],["AU",au_country,au.slice(0, -(arrlen-au_region.length+1))],["AT",at_country,at.slice(0, -(arrlen-at_region.length+1))],["AZ",az_country,az.slice(0, -(arrlen-az_region.length+1))],["BS",bs_country,bs.slice(0, -(arrlen-bs_region.length+1))],["BH",bh_country,bh.slice(0, -(arrlen-bh_region.length+1))],["BD",bd_country,bd.slice(0, -(arrlen-bd_region.length+1))],["BB",bb_country,bb.slice(0, -(arrlen-bb_region.length+1))],["BY",by_country,by.slice(0, -(arrlen-by_region.length+1))],["BE",be_country,be.slice(0, -(arrlen-be_region.length+1))],["BZ",bz_country,bz.slice(0, -(arrlen-bz_region.length+1))],["BJ",bj_country,bj.slice(0, -(arrlen-bj_region.length+1))],["BM",bm_country,bm.slice(0, -(arrlen-bm_region.length+1))],["BT",bt_country,bt.slice(0, -(arrlen-bt_region.length+1))],["BO",bo_country,bo.slice(0, -(arrlen-bo_region.length+1))],["BQ",bq_country,bq.slice(0, -(arrlen-bq_region.length+1))],["BA",ba_country,ba.slice(0, -(arrlen-ba_region.length+1))],["BW",bw_country,bw.slice(0, -(arrlen-bw_region.length+1))],["BR",br_country,br.slice(0, -(arrlen-br_region.length+1))],["IO",io_country,io.slice(0, -(arrlen-io_region.length+1))],["BN",bn_country,bn.slice(0, -(arrlen-bn_region.length+1))],["BG",bg_country,bg.slice(0, -(arrlen-bg_region.length+1))],["BF",bf_country,bf.slice(0, -(arrlen-bf_region.length+1))],["BI",bi_country,bi.slice(0, -(arrlen-bi_region.length+1))],["CV",cv_country,cv.slice(0, -(arrlen-cv_region.length+1))],["KH",kh_country,kh.slice(0, -(arrlen-kh_region.length+1))],["CM",cm_country,cm.slice(0, -(arrlen-cm_region.length+1))],["CA",ca_country,ca.slice(0, -(arrlen-ca_region.length+1))],["KY",ky_country,ky.slice(0, -(arrlen-ky_region.length+1))],["CF",cf_country,cf.slice(0, -(arrlen-cf_region.length+1))],["TD",td_country,td.slice(0, -(arrlen-td_region.length+1))],["CL",cl_country,cl.slice(0, -(arrlen-cl_region.length+1))],["CN",cn_country,cn.slice(0, -(arrlen-cn_region.length+1))],["CX",cx_country,cx.slice(0, -(arrlen-cx_region.length+1))],["CC",cc_country,cc.slice(0, -(arrlen-cc_region.length+1))],["CO",co_country,co.slice(0, -(arrlen-co_region.length+1))],["KM",km_country,km.slice(0, -(arrlen-km_region.length+1))],["CG",cg_country,cg.slice(0, -(arrlen-cg_region.length+1))],["CD",cd_country,cd.slice(0, -(arrlen-cd_region.length+1))],["CK",ck_country,ck.slice(0, -(arrlen-ck_region.length+1))],["CR",cr_country,cr.slice(0, -(arrlen-cr_region.length+1))],["CI",ci_country,ci.slice(0, -(arrlen-ci_region.length+1))],["HR",hr_country,hr.slice(0, -(arrlen-hr_region.length+1))],["CU",cu_country,cu.slice(0, -(arrlen-cu_region.length+1))],["CW",cw_country,cw.slice(0, -(arrlen-cw_region.length+1))],["CY",cy_country,cy.slice(0, -(arrlen-cy_region.length+1))],["CZ",cz_country,cz.slice(0, -(arrlen-cz_region.length+1))],["DK",dk_country,dk.slice(0, -(arrlen-dk_region.length+1))],["DJ",dj_country,dj.slice(0, -(arrlen-dj_region.length+1))],["DM",dm_country,dm.slice(0, -(arrlen-dm_region.length+1))],["DO",do1_country,do1.slice(0, -(arrlen-do1_region.length+1))],["EC",ec_country,ec.slice(0, -(arrlen-ec_region.length+1))],["EG",eg_country,eg.slice(0, -(arrlen-eg_region.length+1))],["SV",sv_country,sv.slice(0, -(arrlen-sv_region.length+1))],["GQ",gq_country,gq.slice(0, -(arrlen-gq_region.length+1))],["ER",er_country,er.slice(0, -(arrlen-er_region.length+1))],["EE",ee_country,ee.slice(0, -(arrlen-ee_region.length+1))],["ET",et_country,et.slice(0, -(arrlen-et_region.length+1))],["FK",fk_country,fk.slice(0, -(arrlen-fk_region.length+1))],["FO",fo_country,fo.slice(0, -(arrlen-fo_region.length+1))],["FJ",fj_country,fj.slice(0, -(arrlen-fj_region.length+1))],["FI",fi_country,fi.slice(0, -(arrlen-fi_region.length+1))],["FR",fr_country,fr.slice(0, -(arrlen-fr_region.length+1))],["GF",gf_country,gf.slice(0, -(arrlen-gf_region.length+1))],["PF",pf_country,pf.slice(0, -(arrlen-pf_region.length+1))],["TF",tf_country,tf.slice(0, -(arrlen-tf_region.length+1))],["GA",ga_country,ga.slice(0, -(arrlen-ga_region.length+1))],["GM",gm_country,gm.slice(0, -(arrlen-gm_region.length+1))],["GE",ge_country,ge.slice(0, -(arrlen-ge_region.length+1))],["DE",de_country,de.slice(0, -(arrlen-de_region.length+1))],["GH",gh_country,gh.slice(0, -(arrlen-gh_region.length+1))],["GI",gi_country,gi.slice(0, -(arrlen-gi_region.length+1))],["GR",gr_country,gr.slice(0, -(arrlen-gr_region.length+1))],["GL",gl_country,gl.slice(0, -(arrlen-gl_region.length+1))],["GD",gd_country,gd.slice(0, -(arrlen-gd_region.length+1))],["GP",gp_country,gp.slice(0, -(arrlen-gp_region.length+1))],["GU",gu_country,gu.slice(0, -(arrlen-gu_region.length+1))],["GT",gt_country,gt.slice(0, -(arrlen-gt_region.length+1))],["GG",gg_country,gg.slice(0, -(arrlen-gg_region.length+1))],["GN",gn_country,gn.slice(0, -(arrlen-gn_region.length+1))],["GW",gw_country,gw.slice(0, -(arrlen-gw_region.length+1))],["GY",gy_country,gy.slice(0, -(arrlen-gy_region.length+1))],["HT",ht_country,ht.slice(0, -(arrlen-ht_region.length+1))],["VA",va_country,va.slice(0, -(arrlen-va_region.length+1))],["HN",hn_country,hn.slice(0, -(arrlen-hn_region.length+1))],["HK",hk_country,hk.slice(0, -(arrlen-hk_region.length+1))],["HU",hu_country,hu.slice(0, -(arrlen-hu_region.length+1))],["IS",is_country,is.slice(0, -(arrlen-is_region.length+1))],["IN",in1_country,in1.slice(0, -(arrlen-in1_region.length+1))],["ID",id_country,id.slice(0, -(arrlen-id_region.length+1))],["IR",ir_country,ir.slice(0, -(arrlen-ir_region.length+1))],["IQ",iq_country,iq.slice(0, -(arrlen-iq_region.length+1))],["IE",ie_country,ie.slice(0, -(arrlen-ie_region.length+1))],["IM",im_country,im.slice(0, -(arrlen-im_region.length+1))],["IL",il_country,il.slice(0, -(arrlen-il_region.length+1))],["IT",it_country,it.slice(0, -(arrlen-it_region.length+1))],["JM",jm_country,jm.slice(0, -(arrlen-jm_region.length+1))],["JP",jp_country,jp.slice(0, -(arrlen-jp_region.length+1))],["JE",je_country,je.slice(0, -(arrlen-je_region.length+1))],["JO",jo_country,jo.slice(0, -(arrlen-jo_region.length+1))],["KZ",kz_country,kz.slice(0, -(arrlen-kz_region.length+1))],["KE",ke_country,ke.slice(0, -(arrlen-ke_region.length+1))],["KI",ki_country,ki.slice(0, -(arrlen-ki_region.length+1))],["KP",kp_country,kp.slice(0, -(arrlen-kp_region.length+1))],["KR",kr_country,kr.slice(0, -(arrlen-kr_region.length+1))],["KW",kw_country,kw.slice(0, -(arrlen-kw_region.length+1))],["KG",kg_country,kg.slice(0, -(arrlen-kg_region.length+1))],["LA",la_country,la.slice(0, -(arrlen-la_region.length+1))],["LV",lv_country,lv.slice(0, -(arrlen-lv_region.length+1))],["LB",lb_country,lb.slice(0, -(arrlen-lb_region.length+1))],["LS",ls_country,ls.slice(0, -(arrlen-ls_region.length+1))],["LR",lr_country,lr.slice(0, -(arrlen-lr_region.length+1))],["LY",ly_country,ly.slice(0, -(arrlen-ly_region.length+1))],["LI",li_country,li.slice(0, -(arrlen-li_region.length+1))],["LT",lt_country,lt.slice(0, -(arrlen-lt_region.length+1))],["LU",lu_country,lu.slice(0, -(arrlen-lu_region.length+1))],["MO",mo_country,mo.slice(0, -(arrlen-mo_region.length+1))],["MK",mk_country,mk.slice(0, -(arrlen-mk_region.length+1))],["MG",mg_country,mg.slice(0, -(arrlen-mg_region.length+1))],["MW",mw_country,mw.slice(0, -(arrlen-mw_region.length+1))],["MY",my_country,my.slice(0, -(arrlen-my_region.length+1))],["MV",mv_country,mv.slice(0, -(arrlen-mv_region.length+1))],["ML",ml_country,ml.slice(0, -(arrlen-ml_region.length+1))],["MT",mt_country,mt.slice(0, -(arrlen-mt_region.length+1))],["MH",mh_country,mh.slice(0, -(arrlen-mh_region.length+1))],["MQ",mq_country,mq.slice(0, -(arrlen-mq_region.length+1))],["MR",mr_country,mr.slice(0, -(arrlen-mr_region.length+1))],["MU",mu_country,mu.slice(0, -(arrlen-mu_region.length+1))],["YT",yt_country,yt.slice(0, -(arrlen-yt_region.length+1))],["MX",mx_country,mx.slice(0, -(arrlen-mx_region.length+1))],["FM",fm_country,fm.slice(0, -(arrlen-fm_region.length+1))],["MD",md_country,md.slice(0, -(arrlen-md_region.length+1))],["MC",mc_country,mc.slice(0, -(arrlen-mc_region.length+1))],["MN",mn_country,mn.slice(0, -(arrlen-mn_region.length+1))],["ME",me_country,me.slice(0, -(arrlen-me_region.length+1))],["MS",ms_country,ms.slice(0, -(arrlen-ms_region.length+1))],["MA",ma_country,ma.slice(0, -(arrlen-ma_region.length+1))],["MZ",mz_country,mz.slice(0, -(arrlen-mz_region.length+1))],["MM",mm_country,mm.slice(0, -(arrlen-mm_region.length+1))],["NA",na_country,na.slice(0, -(arrlen-na_region.length+1))],["NR",nr_country,nr.slice(0, -(arrlen-nr_region.length+1))],["NP",np_country,np.slice(0, -(arrlen-np_region.length+1))],["NL",nl_country,nl.slice(0, -(arrlen-nl_region.length+1))],["NC",nc_country,nc.slice(0, -(arrlen-nc_region.length+1))],["NZ",nz_country,nz.slice(0, -(arrlen-nz_region.length+1))],["NI",ni_country,ni.slice(0, -(arrlen-ni_region.length+1))],["NE",ne_country,ne.slice(0, -(arrlen-ne_region.length+1))],["NG",ng_country,ng.slice(0, -(arrlen-ng_region.length+1))],["NU",nu_country,nu.slice(0, -(arrlen-nu_region.length+1))],["NF",nf_country,nf.slice(0, -(arrlen-nf_region.length+1))],["MP",mp_country,mp.slice(0, -(arrlen-mp_region.length+1))],["NO",no_country,no.slice(0, -(arrlen-no_region.length+1))],["OM",om_country,om.slice(0, -(arrlen-om_region.length+1))],["PK",pk_country,pk.slice(0, -(arrlen-pk_region.length+1))],["PW",pw_country,pw.slice(0, -(arrlen-pw_region.length+1))],["PS",ps_country,ps.slice(0, -(arrlen-ps_region.length+1))],["PA",pa_country,pa.slice(0, -(arrlen-pa_region.length+1))],["PG",pg_country,pg.slice(0, -(arrlen-pg_region.length+1))],["PY",py_country,py.slice(0, -(arrlen-py_region.length+1))],["PE",pe_country,pe.slice(0, -(arrlen-pe_region.length+1))],["PH",ph_country,ph.slice(0, -(arrlen-ph_region.length+1))],["PN",pn_country,pn.slice(0, -(arrlen-pn_region.length+1))],["PL",pl_country,pl.slice(0, -(arrlen-pl_region.length+1))],["PT",pt_country,pt.slice(0, -(arrlen-pt_region.length+1))],["PR",pr_country,pr.slice(0, -(arrlen-pr_region.length+1))],["QA",qa_country,qa.slice(0, -(arrlen-qa_region.length+1))],["RE",re_country,re.slice(0, -(arrlen-re_region.length+1))],["RO",ro_country,ro.slice(0, -(arrlen-ro_region.length+1))],["RU",ru_country,ru.slice(0, -(arrlen-ru_region.length+1))],["RW",rw_country,rw.slice(0, -(arrlen-rw_region.length+1))],["BL",bl_country,bl.slice(0, -(arrlen-bl_region.length+1))],["SH",sh_country,sh.slice(0, -(arrlen-sh_region.length+1))],["KN",kn_country,kn.slice(0, -(arrlen-kn_region.length+1))],["LC",lc_country,lc.slice(0, -(arrlen-lc_region.length+1))],["MF",mf_country,mf.slice(0, -(arrlen-mf_region.length+1))],["PM",pm_country,pm.slice(0, -(arrlen-pm_region.length+1))],["VC",vc_country,vc.slice(0, -(arrlen-vc_region.length+1))],["WS",ws_country,ws.slice(0, -(arrlen-ws_region.length+1))],["SM",sm_country,sm.slice(0, -(arrlen-sm_region.length+1))],["ST",st_country,st.slice(0, -(arrlen-st_region.length+1))],["SA",sa_country,sa.slice(0, -(arrlen-sa_region.length+1))],["SN",sn_country,sn.slice(0, -(arrlen-sn_region.length+1))],["RS",rs_country,rs.slice(0, -(arrlen-rs_region.length+1))],["SC",sc_country,sc.slice(0, -(arrlen-sc_region.length+1))],["SL",sl_country,sl.slice(0, -(arrlen-sl_region.length+1))],["SG",sg_country,sg.slice(0, -(arrlen-sg_region.length+1))],["SX",sx_country,sx.slice(0, -(arrlen-sx_region.length+1))],["SK",sk_country,sk.slice(0, -(arrlen-sk_region.length+1))],["SI",si_country,si.slice(0, -(arrlen-si_region.length+1))],["SB",sb_country,sb.slice(0, -(arrlen-sb_region.length+1))],["SO",so_country,so.slice(0, -(arrlen-so_region.length+1))],["ZA",za_country,za.slice(0, -(arrlen-za_region.length+1))],["GS",gs_country,gs.slice(0, -(arrlen-gs_region.length+1))],["SS",ss_country,ss.slice(0, -(arrlen-ss_region.length+1))],["ES",es_country,es.slice(0, -(arrlen-es_region.length+1))],["LK",lk_country,lk.slice(0, -(arrlen-lk_region.length+1))],["SD",sd_country,sd.slice(0, -(arrlen-sd_region.length+1))],["SR",sr_country,sr.slice(0, -(arrlen-sr_region.length+1))],["SJ",sj_country,sj.slice(0, -(arrlen-sj_region.length+1))],["SZ",sz_country,sz.slice(0, -(arrlen-sz_region.length+1))],["SE",se_country,se.slice(0, -(arrlen-se_region.length+1))],["CH",ch_country,ch.slice(0, -(arrlen-ch_region.length+1))],["SY",sy_country,sy.slice(0, -(arrlen-sy_region.length+1))],["TW",tw_country,tw.slice(0, -(arrlen-tw_region.length+1))],["TJ",tj_country,tj.slice(0, -(arrlen-tj_region.length+1))],["TZ",tz_country,tz.slice(0, -(arrlen-tz_region.length+1))],["TH",th_country,th.slice(0, -(arrlen-th_region.length+1))],["TL",tl_country,tl.slice(0, -(arrlen-tl_region.length+1))],["TG",tg_country,tg.slice(0, -(arrlen-tg_region.length+1))],["TK",tk_country,tk.slice(0, -(arrlen-tk_region.length+1))],["TO",to_country,to.slice(0, -(arrlen-to_region.length+1))],["TT",tt_country,tt.slice(0, -(arrlen-tt_region.length+1))],["TN",tn_country,tn.slice(0, -(arrlen-tn_region.length+1))],["TR",tr_country,tr.slice(0, -(arrlen-tr_region.length+1))],["TM",tm_country,tm.slice(0, -(arrlen-tm_region.length+1))],["TC",tc_country,tc.slice(0, -(arrlen-tc_region.length+1))],["TV",tv_country,tv.slice(0, -(arrlen-tv_region.length+1))],["UG",ug_country,ug.slice(0, -(arrlen-ug_region.length+1))],["UA",ua_country,ua.slice(0, -(arrlen-ua_region.length+1))],["AE",ae_country,ae.slice(0, -(arrlen-ae_region.length+1))],["GB",gb_country,gb.slice(0, -(arrlen-gb_region.length+1))],["US",us_country,us.slice(0, -(arrlen-us_region.length+1))],["UM",um_country,um.slice(0, -(arrlen-um_region.length+1))],["UY",uy_country,uy.slice(0, -(arrlen-uy_region.length+1))],["UZ",uz_country,uz.slice(0, -(arrlen-uz_region.length+1))],["VU",vu_country,vu.slice(0, -(arrlen-vu_region.length+1))],["VE",ve_country,ve.slice(0, -(arrlen-ve_region.length+1))],["VN",vn_country,vn.slice(0, -(arrlen-vn_region.length+1))],["VG",vg_country,vg.slice(0, -(arrlen-vg_region.length+1))],["VI",vi_country,vi.slice(0, -(arrlen-vi_region.length+1))],["WF",wf_country,wf.slice(0, -(arrlen-wf_region.length+1))],["EH",eh_country,eh.slice(0, -(arrlen-eh_region.length+1))],["YE",ye_country,ye.slice(0, -(arrlen-ye_region.length+1))],["ZM",zm_country,zm.slice(0, -(arrlen-zm_region.length+1))],["ZW",zw_country,zw.slice(0, -(arrlen-zw_region.length+1))]];
        country_region= geodatasource_data;
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            (countryElement.options[countryElement.length] = new Option(country_region[i][1], value)).setAttribute("data-class", cc_iso.toLowerCase());
            if (defaultCountrySelectedValue != null && (defaultCountrySelectedValue === value || defaultCountrySelectedValue === cc_iso)) {
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
            }
        }

        countryElement.selectedIndex = foundIndex;

        var regionID = countryElement.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        var cityID = regionElement.getAttribute("region-data-city-id");
        if (!cityID) {
            console.error("Missing data-city-id on region field.");
        }
        var cityElement = document.getElementById(cityID);

        if (regionElement) {
            initialiseRegionField(regionElement);

            countryElement.onchange = function() {
                generateRegionField(countryElement, regionElement);
                generateCityField(regionElement, cityElement);
            };

            if (defaultCountrySelectedValue !== null && countryElement.selectedIndex > 0) {
                generateRegionField(countryElement, regionElement);
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElement.selectedIndex - 1: countryElement.selectedIndex;
                    var data = country_region[index][3];
                    setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
                }
            } else if (showEmptyCountryOption === false) {
                generateRegionField(countryElement, regionElement);
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        if (cityElement) {
            initialiseCityField(cityElement);

            regionElement.onchange = function() {
                generateCityField(regionElement, cityElement);
            };

            if (defaultRegionSelectedValue !== null && regionElement.selectedIndex > 0) {
                generateCityField(regionElement, cityElement);
                var defaultCitySelectedValue = cityElement.getAttribute("city-data-default-value");
                if (defaultCitySelectedValue !== null) {
                    var regionSelected = regionElement.options[regionElement.selectedIndex].text;
                    var data = region_cities[regionSelected];
                    setDefaultCityValue(cityElement, data, defaultCitySelectedValue);
                }
            } else if (showEmptyRegionOption === false) {
                generateCityField(regionElement, cityElement);
            }
        } else {
            console.error("City field with ID " + cityID + " not found.");
        }

        countryElement.setAttribute("data-gds-loaded", "true");
    };

    var initialiseRegion = function() {
        for (var i=0; i<country_region.length; i++) {
            var regionData = {
                regions: []
            };
            var regions = country_region[i][2].split("|");
            for (var j=0; j<regions.length; j++) {
                var parts = [];
                parts.push(regions[j]);
                regionData.regions.push(parts);
            }
            country_region[i][3] = regionData;
        }
    };

    var initialiseRegionField = function(regionElement) {
        var customRegionBlankOptionString = regionElement.getAttribute("region-data-blank-option");
        var defaultRegionBlankOptionString = customRegionBlankOptionString ? customRegionBlankOptionString : "-";
        regionElement.length = 0;
        if (showEmptyRegionOption) {
            regionElement.options[0] = new Option(defaultRegionBlankOptionString, "");
            regionElement.selectedIndex = 0;
        }
    };

    var generateRegionField = function(countryElement, regionElement) {
        var selectedCountryIndex = (showEmptyCountryOption) ? countryElement.selectedIndex - 1 : countryElement.selectedIndex;
        var customRegionOptionString = regionElement.getAttribute("region-data-default-option");
        var defaultRegionOptionString = customRegionOptionString ? customRegionOptionString : regionString;
        
        if (countryElement.value === "") {
            initialiseRegionField(regionElement);
        } else {
            regionElement.length = 0;
            if (showEmptyRegionOption) {
                regionElement.options[0] = new Option(defaultRegionOptionString, "");
            }
            var regionData = country_region[selectedCountryIndex][3];
            for (var i=0; i<regionData.regions.length; i++) {
                var value = regionData.regions[i];
                regionElement.options[regionElement.length] = new Option(regionData.regions[i], value);
            }
            regionElement.selectedIndex = 0;
        }
    };

    var setDefaultRegionValue = function(regionElement, data, defaultRegionSelectedValue) {
        for (var i=0; i<data.regions.length; i++) {
            var currVal = data.regions[i][0];
            if (currVal === defaultRegionSelectedValue) {
                regionElement.selectedIndex = (showEmptyRegionOption) ? i + 1 : i;
                break;
            }
        }
    };

    var initialiseCityField = function(cityElement) {
        var customCityBlankOptionString = cityElement.getAttribute("city-data-blank-option");
        var defaultCityBlankOptionString = customCityBlankOptionString ? customCityBlankOptionString : "-";
        cityElement.length = 0;
        if (showEmptyRegionOption) {
            cityElement.options[0] = new Option(defaultCityBlankOptionString, "");
            cityElement.selectedIndex = 0;
        }
    };

    var generateCityField = function(regionElement, cityElement) {
        var selectedRegionIndex = (showEmptyRegionOption) ? regionElement.selectedIndex - 1 : regionElement.selectedIndex;
        var customCityOptionString = cityElement.getAttribute("city-data-default-option");
        var defaultOptionString = customCityOptionString ? customCityOptionString : cityString;
        var city_stateArr;
        var regionSelected = regionElement.options[regionElement.selectedIndex].text;

        if (region_cities[regionSelected])
        {
            cityElement.length = 0;
            if (showEmptyCityOption) {
                cityElement.options[0] = new Option(defaultOptionString, "");
            }
            city_stateArr = region_cities[regionSelected].split("|");
            for (var i = 0; i < city_stateArr.length; i++) {
                cityElement.options[cityElement.length] = new Option(city_stateArr[i],city_stateArr[i]);
            }
            cityElement.selectedIndex = 0;
        } else {
            initialiseCityField(cityElement);
        }
    };

    var setDefaultCityValue = function(cityElement, data, defaultCitySelectedValue) {
        var city_stateArr;
        cityElement.selectedIndex = 0;
        city_stateArr = data.split("|");
        for (var i = 0; i < city_stateArr.length; i++) {
            var currVal = city_stateArr[i];
            if (currVal === defaultCitySelectedValue) {
                cityElement.selectedIndex = ((showEmptyCityOption) ? i + 1 : i);
                break;
            }
        }
    };

    /*
     * contentloaded.js
     */
    var contentLoaded = function(win, fn) {
        var done = false, top = true,
        doc = win.document,
        root = doc.documentElement,
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    };

    contentLoaded(window, initialise);

    return { init: initialise };
}));