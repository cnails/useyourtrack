import { Card, Typography } from 'antd';
import { useState } from 'react';
import { TaskModal } from './TaskModal';
import CrossIcon from '../Icons/cross.svg?react';
import useCachedImage from '../Utils/useCachedImage';
import { useGetTgUser } from '../api';

const { Title, Text } = Typography;

export const levelsInfo = [
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/1f40/7dd4/31af3582467c4b285817c975227ada06?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYvrlZ9kijfAL~vI91MM18JyugoikJEWblIGq0iiFREfmQEb0UVBVBeokJmgdGGxkTWCQPsAW-S2JMwI~VCgR-e-c7XyJEO~unf388dpf3G4FWseKiO0WfUCU1LIJIjrIC4HyRNJuw5yeo7kDvo77iftLb4wBQ~43WqmpS-uvN7tUD-EoIcae-hTCY4wATjO3p0v6QTpbRlzMK2~7rodD0ewnnSDUD52bPxM7aCgldad5DjQJHCky4x05TEIdgcMWqjlKZL0~qL5eYkUnrVAkfbyh3Ho3U6fbmgzwo5VLoxl9oWm1y4~at6Iw003ARZl9QSZk~KDDft9TSqsYFxAPg__',
    // old
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/1dc6/9006/af82d808801b3ffc7676e4c8c4161d6b?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y5Oh7G2KFgVut5d7lx~3k~sAukxUu5xgt2OxMgKdjA-MAz2v27rBSHeJeyx33Yt~EzpHuI1AB5WyLxC1XpK2ebXAF0gkSLwjPvym827w8BrCQZtfAdR-OaSzmpjXoKuYppEsvxmisC6Sz2SEcIuSaiq0c6JtbWKR2YluKgwwmXcIQ1LVbtG8MHB~NSvRGpnkWOkGb~P7JkvZWX2eYilOiigaQV-lhWPzb8adUWfh1KDF1JGw0bdg9WNEWzxHQUINsZTF7WFVVIvpa9CjyOI~hFumREv00gpBbvM8kTNIUEcYZxT7uARvTORc2Z1OqjF2YEaQ-6AUxIJhQGNHW-zhUQ__',
    title: 'Start',
    color_1: '#743114',
    color_2: '#452010',
    umt_limit: 1500,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/7ac2/8a6c/a22ea914eb0ce403bd099f672a25cd23?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMUc16XVwyQ2xcbC9gIAKEwJ1-Mrq4LgATNp0G78cDaYPwRO85dUx7onV1PptF19jcALPtrmdKZ1NH7aENTqpz7aBjZ2pPquI5-f3MHjDQntbfK8OYipzMWJhvKRhcmddYBOUmdXT7~zlXJ6hl1h8jqMYwoo-c4RK8TM6uxZUfM03qrCWuxqY54zzxkT1JTVzpH8MI3nHPtHA1QgXrdAll4ABonjdd8jxOV9UP24DBKHdyY4rSYXjn0Nb4aO1wP0d09uhHqv4QEvmpinLOzVHOvut16fO8AUylQ6JL4FVvxzEIrtHCPadDssPjOi3arPJ3VFTwnW2afSAuNHNMDkAQ__',
    // old
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/1f40/7dd4/31af3582467c4b285817c975227ada06?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iYvrlZ9kijfAL~vI91MM18JyugoikJEWblIGq0iiFREfmQEb0UVBVBeokJmgdGGxkTWCQPsAW-S2JMwI~VCgR-e-c7XyJEO~unf388dpf3G4FWseKiO0WfUCU1LIJIjrIC4HyRNJuw5yeo7kDvo77iftLb4wBQ~43WqmpS-uvN7tUD-EoIcae-hTCY4wATjO3p0v6QTpbRlzMK2~7rodD0ewnnSDUD52bPxM7aCgldad5DjQJHCky4x05TEIdgcMWqjlKZL0~qL5eYkUnrVAkfbyh3Ho3U6fbmgzwo5VLoxl9oWm1y4~at6Iw003ARZl9QSZk~KDDft9TSqsYFxAPg__',
    title: 'Base',
    color_1: '#B81A14',
    color_2: '#7B0500',
    umt_limit: 3500,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/46dc/146d/37ee5ba29826302461db544cabcfc2a8?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sv6mvmdLHyZvZH8zV0UAYHwBH1ep7VJiRiPItV8D-Dx2oALpobsb987MJGcLFRsHJmfl4lZA76kjdDsCQyhM500DVKtS26VakrECQRyS2-RBVdwVyJ3EZMREgUer7Q8~QQGAN6YO~2-r6fp1ZW9jPts634x3NunOxUXZCEn0YnXjhPRlMf8amNn0g3nAGffS04vReBlA0jfIgmAwqevWA49zA~2d5Clhd1eV9b5PLvLPSSBqs-MDRrsL5~~6CZ5sj7DX9ZoqJU-RG2kWuL2hKLVoiwaVSCSsXk0vZkEduogi8O~3oyjekPNoTSfn56anAI~X~-RosYz3OtWpE5KkMw__',
    // old
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/7ac2/8a6c/a22ea914eb0ce403bd099f672a25cd23?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMUc16XVwyQ2xcbC9gIAKEwJ1-Mrq4LgATNp0G78cDaYPwRO85dUx7onV1PptF19jcALPtrmdKZ1NH7aENTqpz7aBjZ2pPquI5-f3MHjDQntbfK8OYipzMWJhvKRhcmddYBOUmdXT7~zlXJ6hl1h8jqMYwoo-c4RK8TM6uxZUfM03qrCWuxqY54zzxkT1JTVzpH8MI3nHPtHA1QgXrdAll4ABonjdd8jxOV9UP24DBKHdyY4rSYXjn0Nb4aO1wP0d09uhHqv4QEvmpinLOzVHOvut16fO8AUylQ6JL4FVvxzEIrtHCPadDssPjOi3arPJ3VFTwnW2afSAuNHNMDkAQ__',
    title: 'Base +',
    color_1: '#EC5300',
    color_2: '#AC1100',
    umt_limit: 7000,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/8882/de42/8218553828c0e24c386ad60d76a876ac?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gYkXChMhBJ0OoKKDSnoeGV0OJ6KETIka6EAtSbwd89SIRw1GBmtxoCyIb8b2R9dBJEFvYPvaITrq1CuCtL4OsLSfgtU--fzNMkUUUY8uShIQQZtKXi8SbPPakY0~HgFmmyrimbOFqM5RNK5cUfDZ-rVi~s~Tz0DBBrZJ5PwrHcidiskEXhxfwdB8uSEhAlEmcet58OxKcgne08gRygwRvDcftryn27pRvVMJ0JAG-S6ICeED4w09blRrXAyDQS4NIHifIMV-39cpJ04l-xp81UZ7aPm1J2~vEPHwmWMjWNQMalVXLfOmeFTiNXCqaAILaA5r1Nmknii-enIiPSRyCw__',
    // old
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/985a/54f6/3fde03ab94314bab6e424fb4f211cc2c?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CkG0xZv2GY~jxXcol6uAKbfdXTTWG4xT9t1xZCVlHkDUoVZZcJ42UbEYAjUHadBiJSaNrnzL3U0kzpkDGjLgKSAjHYFyF3MX4JFKCcjkH04MnuCvxg3xUmGIUqlYGYAH0eTRilCZQbubBInaumbofMhBEB~NaLdWNtYuA9lcsB7vLdN7s4NrIR1IkqJsJ68NbAfPQxAeM0ODN3VxjmjGVQKWpHmr7Cqzd1F~lc7TINNraJXfbyXaAwbaGOhzF~jAJbjiJj1a14h0Azt-qA4iGrFj5QbAeBl0zvNMxu83foY4rSGglch9sTcK7mH-2KYV85XzuVTWC0tyelWcpJYYGQ__',
    title: 'Standart',
    color_1: '#F06800',
    color_2: '#964100',
    umt_limit: 11000,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/9866/8756/a068f6c7601aa6a69f4b8f62119b86a4?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=osjTGQQ5E4pbTngSXaSw3rdJ4jiUImiTDqhkLji2ovnwgWPDjXyHSFUqk38NxttRa6MUh6CYovMua-ej8fWQgwafkHms8s4GCyPl85ocEkO4mbPPN3DraggBNDzXSux5BxEO8hkLqGx7Qhu2UCBog5Lo1oVYsuelk1t0iruq0TALs~U~a52aFurwpw~aPc5elh0ZXtbEvsiMrVDlJIOPPyewtxbdbxmuJpD0cmHt5UDRztwfoFWl5JcWLSZeTRK9a6TsvPP76ZTOjHr8g~NYoDXJh96041-aLi2lDrI9tQWUEFEo8-r4oZE-FmoxWh5g8CB9-NXMrbBtiQ9epNTzEw__',
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/2f92/9b7c/a31cd9f73ef783f83c4c4d2fbbff11f7?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NzuLfHNeb82Fmp-b-Pdh1qjVfvNF-NkhBnzLSTB61DwCpA80l1NY-FNsz1oEjXVeduN9fi2qw5lwo9hFZ4GOfYsSFw9tW1sGegqgnkQc8BrUO5Zy7r7dYW7eLUvFOb2SnvL5ma1ICV0OUyxrOLoN6Y5pBRX8p~MYbp2J02lOFYmTUNj0OPZuyiR~zLqZQjVVtco8BtyYz6RxRDdZsqq~2TDqqF7rUqeqXhCUmfUPDqjz1RmfkakOUB6Gn6t6~Iq66Ju2ZQtCTSkRCaTnUouRt-dOP8-VvhgdM-JU~snDUEqJmHxAZtSuVYXpCNrYYrQZFuPNyUo0rr5o1n66IcHIXA__',
    title: 'Bronze',
    color_1: '#FBB929',
    color_2: '#C5901C',
    umt_limit: 15000,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/f8c8/f9e1/59640b88eae2b57db785a275a5a70015?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YGSmVbNC1NdISA7cymTDO2Euvdy97aq3nVCh~f4WUZ3n8R46oziZfukXil~nmjoz1B3qwnCUMj6ROaNmdTMzDyCf89lOawk--KpD6dc7qMJmqK-YuksgYsWkPTJwHsJ-D-eYm87tlKzKa77qh7VtQZfiWKLCxvbwkI~uNkKpvqtzL~dDvu8qxim1JG1fr6d0G-HGA--3ofAXZAFFH-3jcUg7rvgQ523iLaIG4~LSnzTXVsho5IU5v~kJ2e6NUk8tIRp7GPQLvusW~D1O7slvXHSMAc1brmVRx5SY0taOeIidBvwxTG21~EoTxH~EJF875S2MlJypUs1mfVjuwnjIsw__',
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/3461/4836/e6199a391a7a2e3a80d91527a34614b5?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZThg0GLM6xXhZsr2FY1x2dtjOwsOTAUsqXabqeiNi3dwGpW5ckr~lSn1v8dPkk1SeYJiBsfDHHVFC3MNsIvqvleyMT188KdcMA8~pc0Kl387t6N5nNvjFzPRlBeLfFCUfqMEjX6eTbPzkKKtwSnhYnJPDWLXC0mxHGIJF6PS5JgJyqh94AzQWwLaLUXobDFgJOHxE6um47p3GWIHVFlXtF8gco4VXKnk1TLrtePS-3svGtBecLovEwsfOxn10woRXLuDdujE-nBViZJkStCam0mbZcDhzqhLDYpZr~uCHFLLFywqj1jEpHqlRAjKLV2UwBgleSbVmVKAD6ZJCUplKw__',
    title: 'Silver',
    color_1: '#F3FF52',
    color_2: '#89920B',
    umt_limit: 22000,
  },
  {
    imageSrc: 'https://s3-alpha-sig.figma.com/img/ac7b/8154/a1a63ddf01b293769e0a3b001a451fd7?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GOEQHXjC4mQ8asUfjfQVdc8r-EgoGWPiNv5oaeOeWo27K09ylESimcYM0NsvQ5ydWDaaFhk-LkJbVZDO~AR1LSdFh8qO4JrKzNz1vtQKU27zMhFGcxdutwYOjSjC3QMqzhIjccWmkC~WHJSmDL0yYUi3reCVA5Z~bJkUYzgAm9EJK4IGilDXcY~WPOg3BvqQZY9SpfqEKYAjl6rF7bExRTx1nHfPNeWBGraLeH0rNai8P2MkgNwFPQP0qqNypZJEvD3iZdpGpNSW5ACfE8l298PW6YDi86t-ksGZXdU1LCo0kFyxCdczJc7OtzOe43B6kHVSL7xUCHJ5Zdetn2uGHg__',
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/f8c8/f9e1/59640b88eae2b57db785a275a5a70015?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YGSmVbNC1NdISA7cymTDO2Euvdy97aq3nVCh~f4WUZ3n8R46oziZfukXil~nmjoz1B3qwnCUMj6ROaNmdTMzDyCf89lOawk--KpD6dc7qMJmqK-YuksgYsWkPTJwHsJ-D-eYm87tlKzKa77qh7VtQZfiWKLCxvbwkI~uNkKpvqtzL~dDvu8qxim1JG1fr6d0G-HGA--3ofAXZAFFH-3jcUg7rvgQ523iLaIG4~LSnzTXVsho5IU5v~kJ2e6NUk8tIRp7GPQLvusW~D1O7slvXHSMAc1brmVRx5SY0taOeIidBvwxTG21~EoTxH~EJF875S2MlJypUs1mfVjuwnjIsw__',
    title: 'Gold',
    color_1: '#C4EA02',
    color_2: '#839C03',
    umt_limit: 31000,
  },
  {
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/f8c8/f9e1/59640b88eae2b57db785a275a5a70015?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YGSmVbNC1NdISA7cymTDO2Euvdy97aq3nVCh~f4WUZ3n8R46oziZfukXil~nmjoz1B3qwnCUMj6ROaNmdTMzDyCf89lOawk--KpD6dc7qMJmqK-YuksgYsWkPTJwHsJ-D-eYm87tlKzKa77qh7VtQZfiWKLCxvbwkI~uNkKpvqtzL~dDvu8qxim1JG1fr6d0G-HGA--3ofAXZAFFH-3jcUg7rvgQ523iLaIG4~LSnzTXVsho5IU5v~kJ2e6NUk8tIRp7GPQLvusW~D1O7slvXHSMAc1brmVRx5SY0taOeIidBvwxTG21~EoTxH~EJF875S2MlJypUs1mfVjuwnjIsw__',
    imageSrc: 'https://s3-alpha-sig.figma.com/img/4aa7/ce7a/a18dafd45304ee48bd43df106cedd6db?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QHdHBNgUPI6~rZDhWGwip6q2gW72fHRBToSKj1cZdoei7VBAvqbwlEbuauFiDjbF5bq2k1Gfjc0pdSz7akkUszD~E1Rw36bB3Io8pOs-eqePaG6aescQFOPs9pblECrAXKocE7LLv-zCX19iKBS7ZnSxyMS9yPFpQ6Ko0L7r9O39CJObMUIFXRSEjjM8nWHd9HcbvMlZCcyvbQ76mRM5UdnBflR~41wMnfeqiNHyptNF7rvIi5xGW~abumRxqni3eBe646Z-jBPuJiVe9GFU2PRW1O3m~bSTpac-tXIe5tyxd7BIQmT0ntE9nJbVgWUMl-kSQ-vB5PrCzqihJz21Gw__',
    title: 'Platinum',
    color_1: '#46FF40',
    color_2: '#12940E',
    umt_limit: 40000,
  },
  {
    // imageSrc: 'https://s3-alpha-sig.figma.com/img/f8c8/f9e1/59640b88eae2b57db785a275a5a70015?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YGSmVbNC1NdISA7cymTDO2Euvdy97aq3nVCh~f4WUZ3n8R46oziZfukXil~nmjoz1B3qwnCUMj6ROaNmdTMzDyCf89lOawk--KpD6dc7qMJmqK-YuksgYsWkPTJwHsJ-D-eYm87tlKzKa77qh7VtQZfiWKLCxvbwkI~uNkKpvqtzL~dDvu8qxim1JG1fr6d0G-HGA--3ofAXZAFFH-3jcUg7rvgQ523iLaIG4~LSnzTXVsho5IU5v~kJ2e6NUk8tIRp7GPQLvusW~D1O7slvXHSMAc1brmVRx5SY0taOeIidBvwxTG21~EoTxH~EJF875S2MlJypUs1mfVjuwnjIsw__',
    imageSrc: 'https://s3-alpha-sig.figma.com/img/4aa7/ce7a/a18dafd45304ee48bd43df106cedd6db?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QHdHBNgUPI6~rZDhWGwip6q2gW72fHRBToSKj1cZdoei7VBAvqbwlEbuauFiDjbF5bq2k1Gfjc0pdSz7akkUszD~E1Rw36bB3Io8pOs-eqePaG6aescQFOPs9pblECrAXKocE7LLv-zCX19iKBS7ZnSxyMS9yPFpQ6Ko0L7r9O39CJObMUIFXRSEjjM8nWHd9HcbvMlZCcyvbQ76mRM5UdnBflR~41wMnfeqiNHyptNF7rvIi5xGW~abumRxqni3eBe646Z-jBPuJiVe9GFU2PRW1O3m~bSTpac-tXIe5tyxd7BIQmT0ntE9nJbVgWUMl-kSQ-vB5PrCzqihJz21Gw__',
    title: 'God',
    color_1: '#7FA467',
    color_2: '#445E27',
  },

  // {
  //   imageSrc: 'https://s3-alpha-sig.figma.com/img/6d3f/d005/0c9dfaa7b71058ee8894ab1078ba89b2?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ri-UWaxdiTWvy3ro6vclqU-KTDZRN6uSpO340pN6qNT62RBwFyehxs~hCTAxCjXJOOGPFRoYRXDu4uidCH7ii06mRDND9fZnwTi33JSsnGK4hbReUeEiGlSC5cMxL6LUf6PPDDhqDTAsylffYrXB~TwvxxPbSfh98VlgqPX2WcVnsKEGB3IZSEKZ0jwRhbaozBULD69vEYwmpxtizmlKBPIw0B52URzqX47AU12az2pXCPr6F8R9IMf~i4WD5PB119myRuRN8gTh6BOAVzM~dCG02QzqYJF8G8l0G6wdopaPuxnU~aIB9WzmufjVBbTzpI7Y4h8jAmmXs7KXBZI7xQ__',
  //   title: 'Platinum',
  //   color_1: '#7FA467',
  //   color_2: '#445E27',
  // },
  // {
  //   imageSrc: 'https://s3-alpha-sig.figma.com/img/6b30/9833/25e20fafd750fd2161af722a557306ed?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WqBmKuE4Uyb8ougTjYpziINrcU10Uy02MQx0wglg5FVH5N6aMW6dXZLEA3~aL62pyLvL6Ppkjd0C1bHa40YyAiw5dB2iXox0CyfVoEPByqx-fMLPfMxtWMtyYeHEXjFg44qQcjgrU0pWszMCw1HSAwvPv9X2dbg7NZMw5-PTYLdh6ZkS8l3o8uKn7dtCPhNceRpWnjE1l5djftAl1kCoMvlPhAgA340tn8OxKMjfH6y6BylulLHpARyQKd6DYDy6cyJRmNCTlkvlHZA-jbzbHUdem5s1kIQXcipL9YSvu4ht0QH-98vVmJw8Ctpouw3oITdqZYUIiLx4LvGFm8dvLA__',
  //   title: 'Grand',
  //   color_1: '#00D75A',
  //   color_2: '#006836',
  // }
]

export const MainTask = () => {
  const {data: userData, isLoading} = useGetTgUser();
  const [isExpanded, setIsExpanded] = useState(false);
  if(isLoading) return null;
  const {imageSrc, title, color_1, color_2} = levelsInfo[userData?.level_id!];
  const colorProps = {'--color-1': color_1, '--color-2': color_2} as any;
  // const imageSrc = "https://s3-alpha-sig.figma.com/img/5a98/e819/84f80fdcb7aaa30221cbc3a8b98fa528?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qlkLnby8OrSFH8Zo5fOq8ccQhOtAmxDxusSBPs2tQH3rRHauu7AtXHkXexVPnV~v9F8YQbFoOJU9aAw90F5D~RdCHtXbpWYlSTlAtOJ3Q70pAuAgsg4wkKsNLRDcWixEaGckKwyI0H7mr97qVfr9D9lt0MBpDHo3-Ih6Ilg8qWL077irnvdMJVOB-GdOz9SevMLy8BNO65-VCpnp-Uo3orojZVuQVugEUVDrGNoik41g4jnIOpiMeyY-69k9yBKGR2PUmV7z2KLKoQLbTJOWxF4U~C84Lseib~7vTtc4UaP0iL9yDpQPs~ghR0PA13~shvrtFgMv8hD4GJQHUlXSUA__";
  // функция по загрузке всех картинок
  // const [imageSrc, loading] = useCachedImage(imageUrl);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`full-width-container ${isExpanded ? 'expanded' : ''}`}>
        <Card className="custom-card" style={colorProps}>
        {isExpanded ? (
          <>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', margin: '-45px 0 8px 0'}}>
              <CrossIcon onClick={() => setIsExpanded(false)} />
            </div>
            <TaskModal onClose={() => setIsExpanded(false)} />
          </>
        ) : (
          <>
            <div className="circle-container">
                <div className="outer_Circle" onClick={handleClick} style={colorProps}>
                    <div className="circle">
                    <img src={imageSrc as string} alt="Custom Icon" className="circle-image" />
                </div>
            </div>
            </div>
            <Title level={3} className="mainTask_title">{title}</Title>
            <Text className="description">Выполнено заданий: {userData?.approved_tasks}</Text>
          </>
        )}
        </Card>
    </div>
  );
};
