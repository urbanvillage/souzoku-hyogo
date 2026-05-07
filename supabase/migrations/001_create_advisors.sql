-- 相続診断士テーブル
CREATE TABLE advisors (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100)  NOT NULL,
  name_kana    VARCHAR(100)  NOT NULL,
  office_name  VARCHAR(200)  NOT NULL,
  prefecture   VARCHAR(20)   NOT NULL DEFAULT '兵庫県',
  city         VARCHAR(50)   NOT NULL,
  phone        VARCHAR(20),
  email        VARCHAR(100),
  website      VARCHAR(300),
  profile      TEXT,
  specialties  TEXT[]        NOT NULL DEFAULT '{}',
  photo_url    VARCHAR(300),
  license_no   VARCHAR(50)   NOT NULL UNIQUE,
  is_published BOOLEAN       NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- 全文検索用インデックス
CREATE INDEX idx_advisors_city       ON advisors (city);
CREATE INDEX idx_advisors_published  ON advisors (is_published);
CREATE INDEX idx_advisors_name_kana  ON advisors (name_kana);
CREATE INDEX idx_advisors_specialties ON advisors USING GIN (specialties);

-- RLS（Row Level Security）設定
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;

-- 一般ユーザー: 公開済みのみ閲覧可
CREATE POLICY "公開済みの診断士は誰でも閲覧可能"
  ON advisors FOR SELECT
  USING (is_published = true);

-- サービスロール: 全操作可（管理者）
CREATE POLICY "管理者は全操作可能"
  ON advisors FOR ALL
  USING (auth.role() = 'service_role');

-- サンプルデータ（兵庫県の診断士）
INSERT INTO advisors (name, name_kana, office_name, city, phone, email, profile, specialties, license_no) VALUES
('田中 誠一',   'たなか せいいち',   '田中相続診断事務所',     '神戸市', '078-111-0001', 'tanaka@example.com',   '神戸を拠点に20年以上の相続業務経験。不動産と税務を組み合わせた総合的な相続対策を得意とします。', ARRAY['不動産','税務'],       'SD-H-00001'),
('佐藤 美香',   'さとう みか',       '佐藤FPコンサルタント',   '姫路市', '0792-22-0002', 'sato@example.com',     '生命保険と事業承継の専門家。中小企業オーナーの相続対策を数多く手がけてきました。',         ARRAY['保険','事業承継'],     'SD-H-00002'),
('鈴木 健太',   'すずき けんた',     '鈴木行政書士事務所',     '尼崎市', '06-6411-0003', 'suzuki@example.com',   '行政書士として相続手続き全般をワンストップで対応。スピーディな対応が強みです。',             ARRAY['不動産','遺言作成'],   'SD-H-00003'),
('山本 真由美', 'やまもと まゆみ',   'やまもと相続サポート',   '西宮市', '0798-33-0004', 'yamamoto@example.com', '女性ならではのきめ細かいサポート。相続税の申告から相続放棄まで幅広く対応します。',           ARRAY['税務','成年後見'],     'SD-H-00004'),
('中村 博之',   'なかむら ひろゆき', '中村総合コンサルティング','宝塚市', '0797-44-0005', 'nakamura@example.com', '経営コンサルタント出身。事業承継と相続を一体的に考えることを得意とします。',               ARRAY['事業承継','民事信託'], 'SD-H-00005'),
('伊藤 幸子',   'いとう さちこ',     '伊藤ライフプランニング', '明石市', '078-912-0006', 'ito@example.com',      '生命保険の専門家として20年以上。相続における保険活用法をわかりやすくご説明します。',         ARRAY['保険','税務'],         'SD-H-00006'),
('渡辺 正樹',   'わたなべ まさき',   '渡辺農地相続事務所',     '豊岡市', '0796-55-0007', 'watanabe@example.com', '但馬地域を中心に農地・山林の相続に特化。地元に密着した丁寧な対応が好評です。',               ARRAY['農地・山林','不動産'], 'SD-H-00007'),
('加藤 春子',   'かとう はるこ',     '加藤法務相談室',         '加古川市','079-421-0008', 'kato@example.com',     '遺言作成の専門家として多くの実績。お客様の想いを確実に未来へ繋ぐお手伝いをします。',           ARRAY['遺言作成','成年後見'], 'SD-H-00008');
