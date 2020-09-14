using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace HomeExercise.Tests.Helpers
{
    public static class TestHelpers
    {
        public static T ParseJsonFromEmbeddedResource<T>(Assembly assembly, string embeddedResource)
        {
            string jsonText = ReadStringFromEmbeddedResource(assembly, embeddedResource);

            var deserialisedObject = JsonConvert.DeserializeObject<T>(jsonText);

            return deserialisedObject;
        }

        public static string ReadStringFromEmbeddedResource(string embeddedResource)
        {
            return ReadStringFromEmbeddedResource(Assembly.GetExecutingAssembly(), embeddedResource);
        }

        public static T ParseJsonFromEmbeddedResource<T>(string embeddedResource)
        {
            return ParseJsonFromEmbeddedResource<T>(Assembly.GetExecutingAssembly(), embeddedResource);
        }

        public static string ReadStringFromEmbeddedResource(Assembly assembly, string embeddedResource)
        {
            string jsonText = string.Empty;
            using (Stream stream = assembly?.GetManifestResourceStream(embeddedResource))
            using (StreamReader reader = new StreamReader(stream))
            {
                jsonText = reader.ReadToEnd();
            }

            return jsonText;
        }
    }
}
