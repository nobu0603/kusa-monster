import { useContributions } from "@/hooks/useContributes";
import { MyContributes } from "@/pages/api/contributions/[userName]";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
import dayjs from "dayjs";

const PixelifySansFont = Pixelify_Sans({
  weight: "500",
  subsets: ["latin"],
});

export const Contributions = () => {
    // 取得したコミット数の配列データを管理するステート
    const [myContributes, setMyContributes] = useState<MyContributes>();
    
    // カスタムフックを代入
    const { getContributions } = useContributions();

    // 描画時に一度、カスタムフックにユーザー名を渡しデータを取得、それをステートにセットする
  useEffect(() => {
    (async () => {
      const data = await getContributions(process.env.NEXT_PUBLIC_GITHUB_USER!);
      setMyContributes(data);
    })();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    /* 日付の取得 */
    const startDate = "2024-01-01";
    const lastDate = "2024-12-31";
    const today = dayjs().format("YYYY-MM-DD");

    // 2024年1月1日から今日までの日数を取得
    const dayCount = dayjs(today).diff(dayjs(startDate), "day") + 1;
    
    /**
     * GitHubの今日のコミット数を数える
     * @param count APIで取得したコミット数
    */
    // 今日の日付の順番を取得
    const todayIndex = dayjs(today).diff(dayjs(startDate), "day");
    let todayCount: number = 0;
    myContributes &&
    myContributes.values.map((count: number, index: number) => {
        if (index === todayIndex) {
            todayCount = count;
        }
    });
    
    /**
     * GitHubの今日までの平均コミット数を数える
     * @param count APIで取得したコミット数
    */
    let averageCount: number = 0;
    myContributes &&
        myContributes.values.map((count: number, index: number) => {
            if (index <= todayIndex) {
                averageCount += count;
            }
    });
    averageCount = Math.floor(averageCount / (todayIndex + 1));
    // averageCountを小数点第一位で四捨五入
    averageCount = Math.round(averageCount * 10) / 10;

    /**
     * GitHubのコミット数を数える
     * @param count APIで取得したコミット数
     */
    let kusaCount: number = 0;
    let commitCount: number = 0;
    myContributes &&
        myContributes.values.map((count: number) => {
            if (count > 0) {
                kusaCount++;
                commitCount += count;
            }
    });
    // console.log(myContributes);

    /**
     * GitHubの草の色を決める関数
     * @param count APIで取得したコミット数
     * @returns opacityのCSS
     */
    const createOpacity = (count: number): string => {
        let opacity: string = "";
        count === 0
            ? opacity = "opacity-0"
            : 1 <= count && count <= 2
            ? opacity = "opacity-20"
            : 3 <= count && count <= 6
            ? opacity = "opacity-40"
            : 7 <= count && count <= 10
            ? opacity = "opacity-60"
            : 11 <= count && count <= 13
            ? opacity = "opacity-80"
            : opacity = "opacity-100";

        return opacity;
    };

    /**
     * Kusaを生成する関数
     * @param count APIで取得したコミット数
     * @returns kusaの表示・非表示と文字サイズのCSS
     */
    const createKusa = (count: number): string => {
        let kusa: string = "";
        count === 0
            ? kusa = "hidden"
            : 1 <= count && count <= 2
            ? kusa = "block w-8 h-8 z-10 -top-8"
            : 3 <= count && count <= 6
            ? kusa = "block w-10 h-10 z-20 -top-10"
            : 7 <= count && count <= 10
            ? kusa = "block w-12 h-12 z-30 -top-12"
            : 11 <= count && count <= 13
            ? kusa = "block w-16 h-16 z-40 -top-16"
            : kusa = "block w-20 h-20 z-50 -top-20";

        return kusa;
    }

    /**
     * Kusaの画像パスを生成する関数
     * @param count APIで取得したコミット数
     * @returns kusaの画像パス
     */
    const createKusaImage = (count: number): string => {
        let kusaItem: string = "";
        count === 0
            ? kusaItem = "/image/img_lv1.svg"
            : 1 <= count && count <= 2
            ? kusaItem = "/image/img_lv1.svg"
            : 3 <= count && count <= 6
            ? kusaItem = "/image/img_lv2.svg"
            : 7 <= count && count <= 10
            ? kusaItem = "/image/img_lv3.svg"
            : 11 <= count && count <= 13
            ? kusaItem = "/image/img_lv4.svg"
            : kusaItem = "/image/img_lv5.svg";

        return kusaItem;
    }

    // topとleftをランダムに生成する関数
    type ramdomPositionType = () => {left:string};
    const createRandom: ramdomPositionType = () => {
        const wW = window.innerWidth;
        const left = wW > 768 ?  Math.floor(Math.random() * 96) : Math.floor(Math.random() * 90);
        const PositionStyles = {
            left: left + "%",
        }
        return PositionStyles;
    };

    return (
        <div className="relative flex items-center justify-center flex-col gap-4 w-full h-full overflow-hidden">
            <div className="absolute w-full h-10 md:h-28 bottom-0 left-0 right-0 bg-[#663a31] bg-[url('/image/bg_soil.png')] bg-repeat-x bg-contain">
                {myContributes &&
                    myContributes.values.map((count: number, index: number) => (
                        <div className={`absolute text-green-700 ${createKusa(count)}`} style={createRandom()} key={index}>
                            <Image
                                src={createKusaImage(count)}
                                alt="random na kusa no image"
                                width={50}
                                height={50}
                                priority={true}
                                className="w-full h-full"
                            />
                        </div>
                    ))
                }
            </div>
            <div className="absolute w-full h-1/4 md:h-1/6 top-0 left-0 right-0 bg-transparent">
                <div className="absolute top-[15%] left-[5%] w-[150px] md:w-[calc(469/1700*100vw)] max-w-[469px] h-auto">
                    <Image
                        src="/image/img_cloud_01.png"
                        alt="cloud 1"
                        width={469}
                        height={214}
                        priority={true}
                        className="w-full h-auto"
                    />
                </div>
                <div className="absolute top-[25%] right-[10%] w-[120px] md:w-[calc(470/1700*100vw)] max-w-[470px] h-auto">
                    <Image
                        src="/image/img_cloud_02.png"
                        alt="cloud 2"
                        width={470}
                        height={209}
                        priority={true}
                        className="w-full h-auto"
                    />
                </div>
                <div className="absolute top-[60%] right-[40%] w-[100px] md:w-[calc(362/1700*100vw)] max-w-[362px] h-auto">
                    <Image
                        src="/image/img_cloud_03.png"
                        alt="cloud 3"
                        width={362}
                        height={172}
                        priority={true}
                        className="w-full h-auto"
                    />
                </div>
            </div>
            <div className="w-full">
                <div className="relative flex items-center justify-center flex-col gap-4 w-full">
                    <div className={`flex items-center justify-center flex-col gap-2 md:gap-4 ${PixelifySansFont.className}`}>
                        <h1 className="text-2xl md:text-6xl font-bold"><span className="text-green-900">GitHub Contributions</span><br/><span className="flex items-center gap-3 text-base md:text-3xl"><span>From : <span className="font-bold text-green-900">{startDate}</span></span> <span className="text-xs md:text-xl">&gt;</span> <span>To : <span className="font-bold text-green-900">{lastDate}</span></span></span></h1>
                        <div className="text-left">
                            <p className="text-base md:text-3xl"><span className="font-bold text-green-900">{dayCount}</span>th day</p>
                            <p className="text-base md:text-3xl">Total Contributions : <span className="font-bold text-green-900">{kusaCount}</span></p>
                            <p className="text-base md:text-3xl">Total Commits : <span className="font-bold text-green-900">{commitCount}</span></p>
                            <p className="text-base md:text-3xl">Average Commits : <span className="font-bold text-green-900">{averageCount}</span></p>
                            <p className="text-base md:text-3xl">{today}&apos;s Commits : <span className="font-bold text-green-900">{todayCount}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-3 md:px-5 bg-blue-100 overflow-x-scroll">
                <div className="relative flex items-start justify-start flex-col flex-wrap mx-auto w-[868px] h-[132px] p-2.5 bg-white">
                    {myContributes &&
                        myContributes.values.map((count: number, index: number) => (
                            <div className="w-4 h-4 [&:nth-child(7n+1)]:border-t border-r border-b [&:nth-child(-n+7)]:border-l border-green-900" key={index}>
                                <div className={`w-full h-full bg-green-900 ${createOpacity(count)}`}></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};