import Eitri from "eitri-bifrost";
import { Header, ProductCard, Button } from "shared-eitri-app";
import { mockProducts } from "../mock/mockData";

export default function Home(props) {
  const [userProfile, setUserProfile] = useState({});
  const goToProductPage = async ({ id }) => {
    console.log("Trying to open product:" + id);
    try {
      await Eitri.exposedApis.internalNavigation.openProduct({ id });
    } catch (error) {
      console.log("error", error);
    }
  };

  const OpenLoginPage = async () => {
    console.log("Trying to OpenLoginPage:");
    try {
      await Eitri.exposedApis.internalNavigation.openLogin();
    } catch (error) {
      console.log("error", error);
    }
  };
  const GetUserProfile = async () => {
    if (Object.keys(userProfile).length !== 0) return;
    console.log("Trying to GetUserProfile:");
    try {
      const output = await Eitri.exposedApis.session.userProfile();
      setUserProfile(output);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Window backgroundColor="neutral-100" statusBarTextColor="white">
      <Header
        title="CeA Template"
        float={false}
        onBackPress={() => {
          Eitri.navigation.back();
        }}
        onCartPress={() => {}}
      />
      <View
        direction="row"
        flexWrap="wrap"
        alignContent="flex-start"
        justifyContent="center"
        gap={8}
        alignItems="center"
      >
        <Text
          fontSize="big"
          fontWeight="bold"
          paddingTop="spacing-16"
          color="title"
        >
          My Eitri-App CeA Template
        </Text>
        <Text
          fontSize="small"
          fontWeight="regular"
          marginHorizontal="spacing-16"
          color="body"
          paddingBottom="spacing-16"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed
          risus eu diam lobortis hendrerit ac sit amet mauris. Phasellus sit
          amet rhoncus elit, id vestibulum tellus. In ultricies nibh eros, at
          elementum ante faucibus ut. Nam at faucibus orci. Nulla erat diam,
          condimentum ac sodales sit amet, viverra tristique dui. Aliquam vitae
          interdum lectus. Integer eleifend nulla erat, ut condimentum ligula
          efficitur varius. Phasellus pharetra erat et pharetra cursus. Maecenas
          id felis neque. Vestibulum dolor magna, cursus eu justo ut, sagittis
          aliquam eros.
        </Text>
        {Array.isArray(mockProducts.products) &&
          mockProducts.products.map((product) => {
            return (
              <ProductCard
                key={product.productId}
                linkProduct={() => {
                  goToProductPage({ id: product.productId });
                }}
                width={"48.5%"}
                productId={product.productId}
                productName={product.productName}
                totalPrice={product.totalPrice}
                priceWithDiscount={product.priceWithDiscount}
                productImg={product.productImg}
              />
            );
          })}

        <Button
          marginTop="spacing-16"
          style="primary"
          size="small"
          label="OPEN LOGIN"
          secondaryIconKey="chevronRight"
          onPress={OpenLoginPage}
          width="150px"
          disabled={false}
        />
        <Button
          marginTop="spacing-16"
          style="primary"
          size="small"
          label="USER PROFILE"
          secondaryIconKey="chevronRight"
          onPress={GetUserProfile}
          width="150px"
          disabled={false}
        />

        {Object.keys(userProfile).length !== 0 && (
          <View direction="column" paddingVertical="spacing-16">
            <Text
              fontSize="small"
              fontWeight="regular"
              marginHorizontal="spacing-16"
              color="body"
              paddingBottom="spacing-8"
            >
              Nome User: {userProfile.username}
            </Text>
            <Text
              fontSize="small"
              fontWeight="regular"
              marginHorizontal="spacing-16"
              color="body"
              paddingBottom="spacing-8"
            >
              Email User: {userProfile.email}
            </Text>
            <Text
              fontSize="small"
              fontWeight="regular"
              marginHorizontal="spacing-16"
              color="body"
              paddingBottom="spacing-8"
            >
              Documento User: {userProfile.document}
            </Text>
            <Text
              fontSize="small"
              fontWeight="regular"
              marginHorizontal="spacing-16"
              color="body"
              paddingBottom="spacing-8"
            >
              Número User: {userProfile.phone}
            </Text>
          </View>
        )}
      </View>
    </Window>
  );
}
