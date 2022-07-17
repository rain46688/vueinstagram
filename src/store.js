// Vuex 셋팅
import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name : "Kim",
      age : 29,
      like : 100,
      likeChange : false,
      more : {},
    }
  },

  // 자바 게터세터 처럼 변경하는건 여기서 담당하게 하는듯
  mutations : {
    nameChange(state){
        state.name = 'Choi'
    },
    ageChange(state, data){
        state.age = state.age + 1 * data;
    },
    likeChange(state){
        if(!state.likeChange){
            state.like++;
            state.likeChange = true;
        }else{
            state.like--;
            state.likeChange = false;
        }
    },
    // actions에서 데이터가를 가져와서 바로 수정하느게 아니라 이렇게 함수를 만들고 거쳐서 수정해야됨
    setMore(state, data){
        state.more = data;
    }
  },

  // ajax 요청하는 곳이라고 따로 정해둔것
  actions : {
    getData(context){
        axios.get('https://codingapple1.github.io/vue/more0.json').then((a)=>{
        console.log(a.data);
        // 커밋으로 mutations에 있는 함수를 호출함
        context.commit('setMore', a.data);
        });
    }
  },

})

export default store