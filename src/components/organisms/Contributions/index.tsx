import { useContributions } from "@/hooks/useContributes";
import { MyContributes } from "@/pages/api/contributions/[userName]";
import { useState, useEffect } from "react";

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
     * GitHubの草の色を決める関数
     * @param count APIで取得したコミット数
     * @returns opacityのCSS
     */
    const createOpacity = (count: number) => {
        let opacity;
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
            : 14 < count && "opacity-100";

        return opacity;
    };

    /**
     * Kusaを生成する関数
     * @param count APIで取得したコミット数
     * @returns kusaの表示・非表示と文字サイズのCSS
     */
    const createKusa = (count: number) => {
        let kusa;
        count === 0
            ? kusa = "hidden"
            : 1 <= count && count <= 2
            ? kusa = "block text-xl"
            : 3 <= count && count <= 6
            ? kusa = "block text-2xl"
            : 7 <= count && count <= 10
            ? kusa = "block text-3xl"
            : 11 <= count && count <= 13
            ? kusa = "block text-4xl"
            : 14 < count && "block text-5xl";

        return kusa;
    }

    // topとleftをランダムに生成する関数
    type ramdomPositionType = () => {top:string, left:string};
    const createRandom: ramdomPositionType = () => {
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const PositionStyles = {
            top: top + "%",
            left: left + "%",
        }
        return PositionStyles;
    };

    return (
        <div className="relative flex items-center justify-center w-full h-full min-h-screen overflow-hidden">
            {myContributes &&
                myContributes.values.map((count: number, index: number) => (
                    <div className={`absolute opacity-20 ${createKusa(count)}`} style={createRandom()} key={index}>www</div>
                ))
            }
            <div className="relative flex items-center justify-start flex-col gap-2 flex-wrap mx-auto w-10/12 md:w-[1264px] h-[160px]">
                {myContributes &&
                    myContributes.values.map((count: number, index: number) => (
                        <div className="border border-blue-900 rounded" key={index}>
                            <div className={`w-3.5 h-3.5 bg-[#04336C] ${createOpacity(count)}`}></div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};