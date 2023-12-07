import { useContributions } from "@/hooks/useContributes";
import { MyContributes } from "@/pages/api/contributions/[userName]";
import { useState, useEffect, use } from "react";
import Image from "next/image";

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
    // console.log(kusaCount);

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
            ? kusa = "block w-8 h-8 z-10"
            : 3 <= count && count <= 6
            ? kusa = "block w-10 h-10 z-20"
            : 7 <= count && count <= 10
            ? kusa = "block w-12 h-12 z-30"
            : 11 <= count && count <= 13
            ? kusa = "block w-16 h-16 z-40"
            : kusa = "block w-20 h-20 z-50";

        return kusa;
    }

    /**
     * Kusaの画像パスを生成する関数
     * @param count APIで取得したコミット数
     * @returns kusaの画像パス
     */
    const createKusaImage = (count: number): string => {
        let kusaItem: string = "/image/img_lv5.svg";
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
    type ramdomPositionType = () => {top:string, left:string};
    const createRandom: ramdomPositionType = () => {
        const top = -10 + Math.floor(Math.random() * 61);
        const left = 5 + Math.floor(Math.random() * 91);
        const PositionStyles = {
            top: top + "%",
            left: left + "%",
        }
        return PositionStyles;
    };

    return (
        <div className="relative flex items-center justify-center flex-col gap-4 w-full h-full min-h-screen overflow-hidden">
            <div className="absolute w-full h-1/4 md:h-1/6 bottom-0 left-0 right-0 bg-[#663a31]">
                {myContributes &&
                    myContributes.values.map((count: number, index: number) => (
                        <div className={`absolute text-green-700 ${createKusa(count)}`} style={createRandom()} key={index}>
                            <Image
                                src={createKusaImage(count)}
                                alt="草"
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
                <div className="absolute top-[15%] left-[5%] w-[598px] h-[178px]">
                    <Image
                        src="/image/img_cloud_01.svg"
                        alt="雲のイラスト"
                        width={598}
                        height={178}
                        priority={true}
                        className="w-full h-full"
                    />
                </div>
                <div className="absolute top-[25%] right-[10%] w-[470px] h-[180px]">
                    <Image
                        src="/image/img_cloud_02.svg"
                        alt="雲のイラスト"
                        width={470}
                        height={180}
                        priority={true}
                        className="w-full h-full"
                    />
                </div>
                <div className="absolute top-[60%] right-[40%] w-[362px] h-[148px]">
                    <Image
                        src="/image/img_cloud_03.svg"
                        alt="雲のイラスト"
                        width={362}
                        height={148}
                        priority={true}
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="w-full">
                <div className="relative flex items-center justify-center flex-col gap-4 w-full h-1/4 md:h-1/6">
                    <div className="flex items-center justify-center flex-col gap-4">
                        <h1 className="text-4xl font-bold text-green-900">GitHub Contributions</h1>
                        <p className="text-xl">本日までの合計草数：<span className="font-bold text-green-900">{kusaCount}</span></p>
                        <p className="text-xl">本日までの合計コミット数：<span className="font-bold text-green-900">{commitCount}</span></p>
                    </div>
                </div>
            </div>
            <div className="w-full px-3 md:px-5 bg-blue-100 overflow-x-scroll">
                <div className="relative flex items-center justify-start flex-col gap-2 flex-wrap mx-auto w-[1284px] h-[180px] p-2.5 bg-white">
                    {myContributes &&
                        myContributes.values.map((count: number, index: number) => (
                            <div className="w-4 h-4 border border-green-900 rounded" key={index}>
                                <div className={`w-3.5 h-3.5 bg-green-900 ${createOpacity(count)}`}></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};