export default{
    state:{
        ads:[
        {title:'First asd',
         description:'description',
         promo: false,
         imageSrc:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
         id:'123'
        },
        {title:'Second asd',
         description:'description',
         promo: true,
         imageSrc:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
         id:'1'
        },
        {title:'Third asd',
         description:'description',
         promo: true,
         imageSrc:'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
         id:'12'
        },
        ]
    },
    mutations:{
        createAd(state, payload){
            state.ads.push(payload)
        }
    },
    actions:{
        createAd({commit}, payload){
            payload.id = '555'

            commit('createAd', payload)
        }
    },
    getters:{
        ads(state){
            return state.ads
        },
        promoAds(state){
            return state.ads.filter(r=>{
                return r.promo
            })
        },
        myAds(state){
            return state.ads
        },
        adById(state){
            return adId => {
                return state.ads.find(ad => ad.id === adId )
            }
        }
    }
}