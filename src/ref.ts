// 参照元のパラメータをリンクに付与するJavaScript。
// 最初から付いているパラメータは現在URLに付いた値で上書きします。

module ReferrerCatchUp {
  export class Initialize {
    
    // （allow_domains）ドメイン許可リスト：デフォルト値「*（全て）」
    private allowDomains: string[] = ['*'];
    
    // （ignore_lists）パラメータ禁止リスト：デフォルト値「空」
    private ignoreLists: string[] = [];
    
    constructor(obj: {
      allow_domains: string[];
      ignore_lists: string[];
    }) {
      if (obj !== undefined) {
        this.allowDomains = obj.allow_domains;
        if (obj.ignore_lists !== null) {
          this.ignoreLists = obj.ignore_lists;
        }
      }
      const QueryString: string = this.getQueryString(window.location.href);
      if (!QueryString) {
        return;
      }
      this.ankerLoop(QueryString);
    }

    // HTML内の<a>要素に対して操作を行う関数
    ankerLoop(param: string) {
      // ページ内全ての<a>要素
      const ankers = document.getElementsByTagName('a');
      Array.prototype.map.call(ankers, anker => {
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
      if (url.indexOf('?') === -1) {
        return '';
      }

      let temp: string[] = Array();

      // ?移行を&で区切り配列化
      const keys: string[] = url.slice(url.indexOf('?') + 1).split('&');

      // パラメータ文字列
      let params: string = '';

      Array.prototype.map.call(keys, key => {
        // #（ハッシュ）入っていたら削除
        key = key.indexOf('#') !== -1 ? key.substring(0, key.indexOf('#')) : key;

        // 空の場合退避
        if (key === '') {
          return;
        }

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
      if (this.ignoreLists) {
        for (const ignoreList of this.ignoreLists) {
          if (param === ignoreList) {
            return false;
          }
        }
      }
      return true;
    }

    // ドメイン許可リストに含まれている場合に真を返す関数
    filterAllowDomain(href: string): boolean {
      for (const allowDomain of this.allowDomains) {
        if (allowDomain === '*' || href.indexOf(allowDomain) !== -1) {
          return true;
        }
      }
      return false;
    }
  }
}
