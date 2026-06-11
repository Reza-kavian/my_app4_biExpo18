import React from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   ////zare_nk_050320_nokteh(in bayad basheh)
      keyboardVerticalOffset={20} ////zare_nk_050320_nokteh(migim alaveh bar bala keshidane mohtava tebghe ertefaeshan, masalan 20 pixel bishtar ham bala bekesh mohtava ra(yani margine
    ////  20 pixel balaye keyboard mireh))
    >
      <ScrollView horizontal={false}
        style={{
          // height: "100%",
          // overflow: "hidden",  ////zare_nk_nokteh(overflow: "hidden" baes mishe age mohtevaye ScrollView azash bishtar bood ghesmate ezafi ra hidden konad va dige niazi be scroll nabashe! )
          borderWidth: 3,
          borderColor: '#020202',
          borderStyle: 'dotted',
        }}
        contentContainerStyle={{
          flexGrow: 1,
          // flexShrink: 1,  ////zare_nk_050320_nokteh(midanim ertefae ScrollView ba baz shodane keyboard kam beshe(chon peress mishe bala), vali flexShrink: 1 baes mishe
          ////  mohtavaye Scrollview niz press beshan be andazeye ertefae Scrollview va dige niazi be scroll nabashe!(midoonim contentContainerStyle marboot ba mohtavasye Scrollview hast))
          flexBasis: 'auto',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        keyboardShouldPersistTaps="handled"  ////zare_nk_050320_nokteh(baraye taamole ScrollView ba KeyboardAvoidingView pishnahad mishe(albateh comment kardam ham farghi nakard))

      >

        <View style={styles.content}>
          <TextInput
            placeholder="1متن را وارد کنید"
            style={styles.input}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            placeholder="متن را وارد کنید2"
            style={styles.input}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            placeholder="متن را وارد کنید3"
            style={styles.input}
          />
        </View>
        <View style={styles.content}>
          <TextInput
            placeholder="4متن را وارد کنید"
            style={styles.input}
          />
        </View>
        {/* <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید5"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید6"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید7"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید8"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید9"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید10"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید11"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید12"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید13"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید14"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید15"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید16"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید17"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید18"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید19"
          style={styles.input}
        />
      </View>
      <View style={styles.content}>
        <TextInput
          placeholder="متن را وارد کنید20"
          style={styles.input}
        />
      </View> */}

      </ScrollView>
    </KeyboardAvoidingView>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1, ////zare_nk_050320_nokteh(age moadele 3propsiye flex:1 ra bedim emkan dare taghirate az 0 be grow ra KeyboardAvoidingView motevajjeh nashe va fekr kone chon 
    //// farzandan flexBasis: 0 daran ertefae kolle motava 0 ast va niazi be keshidane maotava dar balayash nabashad va khodesh faghat bala miad va mohtava miran ziresh )
    ////zare_nk_050320_nokteh_st(sabke 3propsi(moadele flex:1) ke baraye kar ba KeyboardAvoidingView javab nemideh)
    // flexBasis: 0,
    // flexShrink: 1,
    // flexGrow: 1,
    ////zare_nk_050320_nokteh_end(sabke 3propsi(moadele flex:1) ke baraye kar ba KeyboardAvoidingView javab nemideh)

    borderWidth: 3,
    borderColor: '#df1b1b',
    borderStyle: 'dashed',
  },
  content: {
    ////zare_nk_050320_nokteh_st(age farzandane KeyboardAvoidingView flexable nabashan barnameh nemizareh KeyboardAvoidingView anha ra balabekeshe va be harimeshoon tajavoz koneh!)
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 1,
    ////zare_nk_050320_nokteh_end(age farzandane KeyboardAvoidingView flexable nabashan barnameh nemizareh KeyboardAvoidingView anha ra balabekeshe va be harimeshoon tajavoz koneh!)

    // justifyContent: 'center',
    padding: 20,
    borderWidth: 3,
    borderColor: '#00e1ff',
    borderStyle: 'dashed',

    width: "100%",
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#8c00ff',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
});
