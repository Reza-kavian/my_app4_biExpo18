//// zare_nk_050214_okk(in file dar projehaye js mesle nextjs ya reactnative , ... karbord dareh, va karesh modiriate formate codezani ast(bishtar 
//// zibaeiye codezani va moratab boodane code ha , ... ro modiriat mikoneh. pishniaze tamame tanzimate in file in ast ke dar tanzimate vscode Format
////  On Save ro faal konim ke man nakardam(chon mitarsam kharabkari koneh(pas tamame tanzimate paein beraye man kar nemikonan chon Format On Save ro faal nakardam)) ))
module.exports = {
  arrowParens: 'avoid',   //zare_nk_050214_nokteh(mige age arrowfunctioni tanha yek parametr dasht parantez ejbari bashe ya kheir(masalan baraye x => x * 2 
  // age migoftim arrowParens: 'always' hamishe barnameh be automat be (x) => x * 2 tabdil mikoneh)
  singleQuote: true,   //zare_nk_050214_nokteh(age singleQuote: true bashe hengame save kardane mohtava dar file js barnameh automat dabelqute ha ra baraye 
  //// string ha be singleqoute tabdil mikoneh ta sabke meghdardehi be reshteha ye joor bashe,albate dar tanzimate vscode bayad Format On Save ham faal 
  // bashe,man Format On Save ro tik nazadam(chon mitarsam kharabkari koneh ye vaght) dar tanzimate vscode, vali age gharare tik bezanam behtare mode ro ham az fill be modifications taghei bedim
  // ke har bar be jaye kolle file faghat oon khotooti ke virayesh va ijad kardim ro morattab koneh )
  trailingComma: 'all',  //zare_nk_050214_nokteh(age trailingComma: 'all', bashe, dar araye ha ya object ha barnameh auto mat bade akharin ozv ham yak virgool ezafeh 
  //// mikone(man dar sabke dastiye khodamam hamin kari mikonam mamoolan vali tarjih midam in gozine ro faal nakonam ta ye vaght barnameh kharabkari nakoneh(pas Format On Save ro faal nakardam )))
};
