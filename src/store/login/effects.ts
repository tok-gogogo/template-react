const effects = () => ({
  async asyncGetList(type: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`get list ${type}`);
  },
});

export default effects;
