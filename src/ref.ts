// 参照元のパラメータをリンクに付与するJavaScript。
// 最初から付いているパラメータは現在URLに付いた値で上書きします。

// （allow_domains）ドメイン許可リスト：デフォルト値「*（全て）」
let allow_domains: string[] = ['*'];

// （ignore_lists）パラメータ禁止リスト：デフォルト値「空」
let ignore_lists: string[];

module ReferrerCatchUp {
  export class Initialize {
    constructor(obj: any) {
      if (obj !== undefined) {
        allow_domains = obj.allow_domains;
        ignore_lists = obj.ignore_lists;
      }
      const QueryString: string = this.getQueryString(window.location.href);
      if (!QueryString) return;
      this.ankerLoop(QueryString);
    }

    // HTML内の<a>要素に対して操作を行う関数
    ankerLoop(param: string) {
      // ページ内全ての<a>要素
      const ankers = document.getElementsByTagName('a');
      [].map.call(ankers, anker => {
        const href = anker.href;
        if (this.filterAllowDomain(href) && /^https?(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/.test(href)) {
          // URLに?を含むか
          if (anker.href.indexOf('?') === -1) {
            anker.href += '?' + param.slice(1);
          } else {
            anker.href += param;
          }
        }
      });
    }

    // 現在URLからパラメータを配列化する関数
    getQueryString(url: string): string {
      // URLに?を含むか
      if (url.indexOf('?') === -1) return '';

      let temp: string[] = Array();

      // ?移行を&で区切り配列化
      const keys: string[] = url.slice(url.indexOf('?') + 1).split('&');

      // パラメータ文字列
      let params: string = '';

      [].map.call(keys, key => {
        // #（ハッシュ）入っていたら削除
        key = key.indexOf('#') !== -1 ? key.substring(0, key.indexOf('#')) : key;

        // 空の場合退避
        if (key === '') return;

        // パラメータ=値の形で配列化
        temp = key.split('=');
        if (this.filterReferrer(temp[0])) {
          params += '&' + temp[0] + '=' + temp[1];
        }
      });
      return params;
    }

    // パラメータ禁止リストに含まれていた場合に偽を返す関数
    filterReferrer(param: string): boolean {
      if (ignore_lists) {
        for (const ignore_list of ignore_lists) {
          if (param === ignore_list) {
            return false;
          }
        }
      }
      return true;
    }

    // ドメイン許可リストに含まれている場合に真を返す関数
    filterAllowDomain(href: string): boolean {
      for (const allow_domain of allow_domains) {
        if (allow_domain === '*' || href.indexOf(allow_domain) !== -1) {
          return true;
        }
      }
      return false;
    }
  }
}
